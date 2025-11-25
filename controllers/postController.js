const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const NotFoundError = require("../exceptions/NotFoundError");
const fs = require('fs');
const path = require('path'); // multer imgs

// Creazione automatica dello slug dal titolo fornito lato front end
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[àáäâèéëêìíïîòóöôùúüûç·/_,:;']/g, '') // Rimuovi accenti e caratteri speciali
    .replace(/\s+/g, '-')    // Sostituisci spazi con -
    .replace(/--+/g, '-')    // Elimina più trattini consecutivi
    .replace(/^-+|-+$/g, ''); // Elimina trattini ad inizio/fine
}

// Funzione per slug unico 
async function getUniqueSlug(prisma, baseSlug, excludeId) {
  let actualSlug = baseSlug;
  let slugCounter = 1;
  // Fai attenzione a non generare slug uguali ad altri post già esistenti (escluso quello che stai modificando)
  while (
    await prisma.post.findFirst({
      where: { slug: actualSlug, NOT: { id: excludeId } }
    })
  ) {
    actualSlug = `${baseSlug}-${slugCounter++}`;
  }
  return actualSlug;
}

// Recupera tutti i post (con filtri opzionali: published, search), paginazione, includi categoria e tag
async function index(req, res, next) {
  // Query string: ?published=true&search=foo&page=1&limit=10
  const { published, search, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  let where = {};

  // Filtro pubblicazione
  if (published !== undefined) {
    where.published = published === 'true';
  }

  // Filtro ricerca fulltext su title e content
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } }
    ];
  }

  try {
    const posts = await prisma.post.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      include: { category: true, tags: true }
    });
    const totalCount = await prisma.post.count({ where });

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      data: posts,
    });
  } catch (err) {
    next(err);
  }
}

// Recupera un singolo post tramite slug (con categoria e tag)
async function show(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: { category: true, tags: true }
    });
    if (!post) throw new NotFoundError();
    res.json(post);
  } catch (err) {
    next(err);
  }
}

// Crea un nuovo post
async function store(req, res, next) {
  try {
    const data = req.body;
    let {
      categoryId,
      authorId,
      tagIds,     // dalla form FE: array di stringhe ["1","2"]
      published,
      ...rest
    } = data;

    // Gestione immagine uploadata
    let imageUrl = null;
    let imageName = null;
    let imageExt = null;
    if (req.file) {
      imageUrl = '/uploads/' + req.file.filename;
      imageName = req.file.originalname;
      imageExt = path.extname(req.file.originalname);
    }

    // Gestione relazione tag molti-a-molti
    let tagsInput = undefined;
    if (Array.isArray(tagIds)) {
      tagsInput = { connect: tagIds.map(id => ({ id: Number(id) })) };
    } else if (tagIds) {
      tagsInput = { connect: [{ id: Number(tagIds) }] };
    }

    // Conversione campi particolari
    // published può arrivare come stringa
    let normalizedPublished =
      typeof published === "string"
        ? published === "true"
        : Boolean(published);

    // Slug unico
    const baseSlug = slugify(rest.title);
    let uniqueSlug = baseSlug;
    // Cerca collisione slug (evita duplicati)
    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 10000)}`;
    }

    // Prepara oggetto dati per Prisma
    const newPostData = {
      ...rest,
      slug: uniqueSlug,
      image: imageUrl,
      imageName,
      imageExt,
      published: normalizedPublished,
      author: authorId
        ? { connect: { id: Number(authorId) } }
        : { connect: { id: 1 } }, // default ID autore se mancante
      ...(categoryId
        ? { category: { connect: { id: Number(categoryId) } } }
        : {}),
      ...(tagsInput && { tags: tagsInput })
    };

    const newPost = await prisma.post.create({
      data: newPostData,
      include: { category: true, tags: true }
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error("ERROR:", err);
    next(err);
  }
}

// Aggiorna un post tramite slug
async function update(req, res, next) {
  try {
    const slug = req.params.slug;
    const incomingData = req.body;

    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) throw new NotFoundError();

    // 1. Normalizza i dati in arrivo (togli tutto ciò che Prisma non deve ricevere direttamente)
    let {
      categoryId,
      authorId,
      tagIds, // Arriva come array o stringa
      published,
      ...rest
    } = incomingData;

    // 2. Gestione dell'immagine (nuova o esistente)
    let imageUrl = post.image;
    let imageName = post.imageName;
    let imageExt = post.imageExt;

    if (req.file) {
      imageUrl = '/uploads/' + req.file.filename;
      imageName = req.file.originalname;
      imageExt = path.extname(req.file.originalname);

      // Rimuovi vecchio file
      if (post.image) {
        const oldImagePath = path.join(__dirname, '..', post.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.warn('Errore cancellazione vecchia immagine:', err.message);
          }
        });
      }
    }

    // 3. Gestione relazione tags molti-a-molti
    let tagsInput;
    if (Array.isArray(tagIds)) {
      tagsInput = { set: tagIds.map(id => ({ id: Number(id) })) };
    } else if (tagIds) {
      // Potrebbe essere singolo valore stringa
      tagsInput = { set: [{ id: Number(tagIds) }] };
    }

    // 4. Conversione campi particolari
    // published
    let normalizedPublished =
      typeof published === 'string'
        ? published === 'true'
        : Boolean(published);

    // 5. Slug automatico se cambia il titolo
    let newSlug = post.slug;
    if ('title' in rest && rest.title !== post.title) {
      const baseSlug = slugify(rest.title);
      newSlug = await getUniqueSlug(prisma, baseSlug, post.id);
    }

    // 6. PREPARA oggetto dati finale
    const updateData = {
      ...rest,
      published: normalizedPublished,
      slug: newSlug,
      image: imageUrl,
      imageName,
      imageExt,
      // Relazioni (solo se presenti, così non sovrascrivi se non arriva niente)
      ...(categoryId
        ? { category: { connect: { id: Number(categoryId) } } }
        : { category: { disconnect: true } }),
      ...(tagsInput && { tags: tagsInput })
    };

    // 7. Update finale Prisma
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: updateData,
      include: { category: true, tags: true }
    });

    return res.json(updatedPost);
  } catch (err) {
    next(err);
  }
}

// Elimina un post tramite slug
async function destroy(req, res, next) {
  try {
    const slug = req.params.slug;
    // 1. Recupera il post da eliminare, inclusi i tag per eventuale pulizia relazione ponte
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { tags: true }
    });
    if (!post) throw new NotFoundError();

    // 2. Disassocia tutti i tag (tabella ponte molti-a-molti)
    await prisma.post.update({
      where: { slug },
      data: { tags: { set: [] } }
    });

    // 3. Rimuovi l’immagine fisica se esiste
    if (post.image) {
      const fs = require('fs');
      const path = require('path');
      const oldImagePath = path.join(__dirname, '..', post.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.warn('Errore cancellazione immagine:', err.message);
      });
    }

    // 4. (PRODUZIONE) Autorizzazione: solo admin/autore può cancellare
    // if (
    //   req.user.role !== 'admin' &&
    //   req.user.id !== post.authorId
    // ) {
    //   return res.status(403).json({ error: 'You are not authorized to delete this post' });
    // }

    // 5. Elimina il post dal database
    await prisma.post.delete({ where: { slug } });

    // 6. Risposta vuota OK
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
