const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const NotFoundError = require("../exceptions/NotFoundError");

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

    // Gestione relazione tags molti-a-molti
    let tagsInput = undefined;
    if (Array.isArray(data.tags) && data.tags.length > 0) {
      tagsInput = { connect: data.tags.map(id => ({ id })) };
    }

    // ------ AUTENTICAZIONE BACKEND ------
    // In produzione, ottieni l'authorId dall'utente autenticato:
    // const authorId = req.user.id;
    
    // ------ SVILUPPO FE (senza auth) ------
    // Passa authorId dal FE oppure usa valore di default
    const authorId = data.authorId || 1;

    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        categoryId: data.categoryId,
        published: typeof data.published === 'boolean' ? data.published : false,
        authorId,
        ...(tagsInput && { tags: tagsInput }),
      },
      include: { category: true, tags: true }
    });

    res.status(201).json(newPost);
  } catch (err) {
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

    // ------ AUTENTICAZIONE BACKEND ------
    // In produzione, non permettere di cambiare l'autore:
    // if ('authorId' in incomingData) delete incomingData.authorId;

    // ------ SVILUPPO FE (senza auth) ------
    // Puoi permettere il field authorId solo per test

    // Gestione relazione tags molti-a-molti
    let tagsInput = undefined;
    if (Array.isArray(incomingData.tags)) {
      tagsInput = { set: incomingData.tags.map(id => ({ id })) };
      delete incomingData.tags;
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        ...incomingData,
        ...(tagsInput && { tags: tagsInput }),
      },
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
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { tags: true }
    });
    if (!post) throw new NotFoundError();

    // ------ AUTENTICAZIONE BACKEND ------
    // In produzione, abilita solo admin/autore:
    // if (
    //   req.user.role !== 'admin' &&
    //   req.user.id !== post.authorId
    // ) {
    //   return res.status(403).json({ error: 'You are not authorized to delete this post' });
    // }

    // Rimuovi relazioni con i tag
    await prisma.post.update({
      where: { slug },
      data: { tags: { set: [] } }
    });

    await prisma.post.delete({ where: { slug } });

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
