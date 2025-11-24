const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Categorie
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Tecnologia' },
      { name: 'Design' },
      { name: 'Cultura Digitale' },
      { name: 'Startup' },
      { name: 'Content Marketing' },
    ],
  });

  // Tag
  const tags = await prisma.tag.createMany({
    data: [
      { name: 'JavaScript' },
      { name: 'Vue.js' },
      { name: 'UX Design' },
      { name: 'AI' },
      { name: 'Sviluppo Web' },
      { name: 'CSS' },
      { name: 'MySQL' },
      { name: 'Node.js' },
      { name: 'Open Source' },
      { name: 'Startup' },
      { name: 'Content Writing' },
      { name: 'Responsive' },
      { name: 'API REST' },
      { name: 'Performance' },
      { name: 'SEO' },
    ],
  });

  // Utenti
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'marta.rossi@email.com',
        name: 'Marta Rossi',
        role: 'admin',
        password: '$2y$10$demoHashA1',
      },
      {
        email: 'luca.verdi@email.com',
        name: 'Luca Verdi',
        role: 'editor',
        password: '$2y$10$demoHashB2',
      },
      {
        email: 'chiara.bianchi@email.com',
        name: 'Chiara Bianchi',
        role: 'user',
        password: '$2y$10$demoHashC3',
      },
    ],
  });

  // Recupera gli ID reali dalle tabelle appena create
  const categoryIds = await prisma.category.findMany();
  const tagIds = await prisma.tag.findMany();
  const userIds = await prisma.user.findMany();

  // Post
  const postsData = [
    {
      title: 'Scopriamo le novità di Vue 3.4: reattività e performance',
      slug: 'novita-vue-3-4-reattivita-performance',
      image: 'https://source.unsplash.com/random/800x400?vuejs,update',
      content: 'Vue 3.4 introduce migliorie nella gestione degli stati e nuove funzionalità per la reattività. In questo articolo esploriamo come sfruttarle per progetti moderni e performanti.',
      published: true,
      categoryId: categoryIds[0].id,
      authorId: userIds[0].id,
      tagConnect: [2,1,14],
    },
    {
      title: '5 strategie per migliorare l’esperienza utente in un blog',
      slug: 'strategie-user-experience-blog',
      image: 'https://source.unsplash.com/random/800x400?ux,blog',
      content: 'Dall’accessibilità alla navigazione semplificata: vediamo insieme come migliorare la lettura e la permanenza degli utenti su un blog utilizzando i principi fondamentali dell’UX.',
      published: true,
      categoryId: categoryIds[1].id,
      authorId: userIds[2].id,
      tagConnect: [3,12],
    },
    {
      title: 'Come l’Intelligenza Artificiale sta cambiando il Content Writing',
      slug: 'ai-content-writing-cambiamenti',
      image: 'https://source.unsplash.com/random/800x400?ai,writing',
      content: 'Sono sempre di più gli strumenti AI che supportano i copywriter nella scrittura di contenuti: trucchi, vantaggi e rischi del loro utilizzo raccontati da Marta Rossi.',
      published: true,
      categoryId: categoryIds[2].id,
      authorId: userIds[0].id,
      tagConnect: [4,11],
    },
    {
      title: 'Guida pratica a Prisma ORM con Node.js e MySQL',
      slug: 'prisma-orm-nodejs-mysql',
      image: 'https://source.unsplash.com/random/800x400?prisma,nodejs',
      content: 'Configurare Prisma ORM in un progetto Node.js con MySQL: setup iniziale, migrazioni e query type-safe per uno stack moderno e scalabile.',
      published: true,
      categoryId: categoryIds[0].id,
      authorId: userIds[1].id,
      tagConnect: [8,7,5],
    },
    {
      title: 'Il ruolo dei tag nel Content Marketing',
      slug: 'ruolo-tag-content-marketing',
      image: 'https://source.unsplash.com/random/800x400?tag,content',
      content: 'Organizzare bene i tag aiuta la SEO e la scoperta dei contenuti. Ecco alcuni consigli pratici per una strategia ottimale di tagging in blog ed editoriali.',
      published: true,
      categoryId: categoryIds[4].id,
      authorId: userIds[2].id,
      tagConnect: [15,11],
    },
    {
      title: 'CSS moderno: flex, grid e responsive design dalle basi all’avanzato',
      slug: 'css-moderno-flex-grid-responsive',
      image: 'https://source.unsplash.com/random/800x400?css,responsive',
      content: 'Una panoramica completa sulle tecniche moderne di CSS per layout professionali e responsivi. Tutorial passo-passo e best practice a cura di Luca Verdi.',
      published: true,
      categoryId: categoryIds[1].id,
      authorId: userIds[1].id,
      tagConnect: [6,12],
    },
    {
      title: 'Open Source: tre motivi per contribuire nel 2025',
      slug: 'open-source-motivi-2025',
      image: 'https://source.unsplash.com/random/800x400?opensource,team',
      content: 'I vantaggi reali del collaborare a progetti open source nel panorama attuale: crescita personale, networking e accesso alle tecnologie più moderne.',
      published: true,
      categoryId: categoryIds[2].id,
      authorId: userIds[0].id,
      tagConnect: [9,5],
    },
    {
      title: 'Node.js e la gestione delle API RESTful: errori comuni da evitare',
      slug: 'nodejs-api-rest-errori-comuni',
      image: 'https://source.unsplash.com/random/800x400?nodejs,api',
      content: 'Dai permessi CORS alla gestione degli errori: una checklist pratica, basata sull’esperienza reale, per sviluppare API REST performanti e sicure con Node.js.',
      published: true,
      categoryId: categoryIds[0].id,
      authorId: userIds[1].id,
      tagConnect: [8,13],
    },
    {
      title: 'Dalla bozza alla pubblicazione: come nasce un post di successo',
      slug: 'bozza-pubblicazione-post-successo',
      image: 'https://source.unsplash.com/random/800x400?writing,success',
      content: 'Il workflow completo e ragionato di Marta Rossi, dalla ricerca iniziale alla revisione e pubblicazione di articoli che conquistano davvero i lettori.',
      published: true,
      categoryId: categoryIds[4].id,
      authorId: userIds[0].id,
      tagConnect: [11,5],
    },
    {
      title: 'Startup e blogging: come raccontare la tua idea dal giorno uno',
      slug: 'startup-blogging-racconto-idea',
      image: 'https://source.unsplash.com/random/800x400?startup,blog',
      content: 'Raccontare pubblicamente la nascita e la crescita di una startup aiuta a generare community, raccogliere feedback e attirare collaboratori: strategie vincenti spiegate con esempi concreti.',
      published: true,
      categoryId: categoryIds[3].id,
      authorId: userIds[2].id,
      tagConnect: [10,3],
    },
  ];

  // Crea i post e associa i tag
  for (const item of postsData) {
    await prisma.post.create({
      data: {
        title: item.title,
        slug: item.slug,
        image: item.image,
        content: item.content,
        published: item.published,
        categoryId: item.categoryId,
        authorId: item.authorId,
        tags: {
          connect: item.tagConnect.map(id => ({ id })),
        },
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // npx prisma db seed

