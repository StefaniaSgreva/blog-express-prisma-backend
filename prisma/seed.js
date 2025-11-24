const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // === CATEGORIE (esempi di macro-temi per i post) ===
  await prisma.category.createMany({
    data: [
      { name: 'Tecnologia' },      // 0: articoli tech, tutorial, novità software
      { name: 'Design' },          // 1: UX/UI, responsive, micro-interazioni
      { name: 'Cultura Digitale' },// 2: AI, open source, evoluzione web
      { name: 'Startup' },         // 3: innovazione, storie imprenditoriali
      { name: 'Content Marketing'} // 4: strategie editoriali e SEO
    ],
  });

  // === TAGS (parole chiave: usate nei post) ===
  await prisma.tag.createMany({
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

  // === UTENTI (editor/admin: ruoli e biografie accennate) ===
  await prisma.user.createMany({
    data: [
      { 
        email: 'marta.rossi@email.com',
        name: 'Marta Rossi',
        role: 'admin',
        password: '$2y$10$demoHashA1',
        // Marta Rossi: admin, creatrice del progetto/blog,
        // autrice di articoli su AI, open source e strategie editoriali
      },
      { 
        email: 'luca.verdi@email.com',
        name: 'Luca Verdi',
        role: 'editor',
        password: '$2y$10$demoHashB2',
        // Luca Verdi: editor tecnico,
        // prevalentemente articoli su Node.js, backend, frontend e tool
      },
      { 
        email: 'chiara.bianchi@email.com',
        name: 'Chiara Bianchi',
        role: 'user',
        password: '$2y$10$demoHashC3',
        // Chiara Bianchi: contributor utente,
        // focus su UX design, micro-interazioni, layout, design system
      },
    ],
  });

  // === Recupera ID reali per referenze ===
  const categoryIds = await prisma.category.findMany();
  const tagIds = await prisma.tag.findMany();
  const userIds = await prisma.user.findMany();

  // === ARRAY POST: ognuno associato ad autori/editor e argomenti coerenti ===
  const postsData = [
    {
      title: 'Scopriamo le novità di Vue 3.4: reattività e performance',
      slug: 'novita-vue-3-4-reattivita-performance',
      image: 'https://source.unsplash.com/random/800x400?vuejs,update',
      content: 'Vue 3.4 introduce migliorie nella gestione degli stati e nuove funzionalità per la reattività. In questo articolo esploriamo come sfruttarle per progetti moderni e performanti.',
      published: true,
      categoryId: categoryIds[0].id,
      authorId: userIds[0].id, // Marta Rossi: admin, tech insights
      tagConnect: [2,1,14],
    },
    {
      title: '5 strategie per migliorare l’esperienza utente in un blog',
      slug: 'strategie-user-experience-blog',
      image: 'https://source.unsplash.com/random/800x400?ux,blog',
      content: 'Dall’accessibilità alla navigazione semplificata: vediamo insieme come migliorare la lettura e la permanenza degli utenti su un blog utilizzando i principi fondamentali dell’UX.',
      published: true,
      categoryId: categoryIds[1].id,
      authorId: userIds[2].id, // Chiara Bianchi: design e UX
      tagConnect: [3,12],
    },
    {
      title: 'Come l’Intelligenza Artificiale sta cambiando il Content Writing',
      slug: 'ai-content-writing-cambiamenti',
      image: 'https://source.unsplash.com/random/800x400?ai,writing',
      content: 'Sono sempre di più gli strumenti AI che supportano i copywriter nella scrittura di contenuti: trucchi, vantaggi e rischi del loro utilizzo raccontati da Marta Rossi.',
      published: true,
      categoryId: categoryIds[2].id,
      authorId: userIds[0].id, // Marta: AI e cultura digitale
      tagConnect: [4,11],
    },
    {
      title: 'Guida pratica a Prisma ORM con Node.js e MySQL',
      slug: 'prisma-orm-nodejs-mysql',
      image: 'https://source.unsplash.com/random/800x400?prisma,nodejs',
      content: 'Configurare Prisma ORM in un progetto Node.js con MySQL: setup iniziale, migrazioni e query type-safe per uno stack moderno e scalabile.',
      published: true,
      categoryId: categoryIds[0].id,
      authorId: userIds[1].id, // Luca Verdi: editor, backend
      tagConnect: [8,7,5],
    },
    {
      title: 'Il ruolo dei tag nel Content Marketing',
      slug: 'ruolo-tag-content-marketing',
      image: 'https://source.unsplash.com/random/800x400?tag,content',
      content: 'Organizzare bene i tag aiuta la SEO e la scoperta dei contenuti. Ecco alcuni consigli pratici per una strategia ottimale di tagging in blog ed editoriali.',
      published: true,
      categoryId: categoryIds[4].id,
      authorId: userIds[2].id, // Chiara: pratiche editoria digital
      tagConnect: [15,11],
    },
    {
      title: 'CSS moderno: flex, grid e responsive design dalle basi all’avanzato',
      slug: 'css-moderno-flex-grid-responsive',
      image: 'https://source.unsplash.com/random/800x400?css,responsive',
      content: 'Una panoramica completa sulle tecniche moderne di CSS per layout professionali e responsivi. Tutorial passo-passo e best practice a cura di Luca Verdi.',
      published: true,
      categoryId: categoryIds[1].id,
      authorId: userIds[1].id, // Luca: frontend/CSS
      tagConnect: [6,12],
    },
    {
      title: 'Open Source: tre motivi per contribuire nel 2025',
      slug: 'open-source-motivi-2025',
      image: 'https://source.unsplash.com/random/800x400?opensource,team',
      content: 'I vantaggi reali del collaborare a progetti open source nel panorama attuale: crescita personale, networking e accesso alle tecnologie più moderne.',
      published: true,
      categoryId: categoryIds[2].id,
      authorId: userIds[0].id, // Marta: open source topic
      tagConnect: [9,5],
    },
    {
      title: 'Node.js e la gestione delle API RESTful: errori comuni da evitare',
      slug: 'nodejs-api-rest-errori-comuni',
      image: 'https://source.unsplash.com/random/800x400?nodejs,api',
      content: 'Dai permessi CORS alla gestione degli errori: una checklist pratica, basata sull’esperienza reale, per sviluppare API REST performanti e sicure con Node.js.',
      published: true,
      categoryId: categoryIds[0].id,
      authorId: userIds[1].id, // Luca: API e sicurezza
      tagConnect: [8,13],
    },
    {
      title: 'Dalla bozza alla pubblicazione: come nasce un post di successo',
      slug: 'bozza-pubblicazione-post-successo',
      image: 'https://source.unsplash.com/random/800x400?writing,success',
      content: 'Il workflow completo e ragionato di Marta Rossi, dalla ricerca iniziale alla revisione e pubblicazione di articoli che conquistano davvero i lettori.',
      published: true,
      categoryId: categoryIds[4].id,
      authorId: userIds[0].id, // Marta: metodo redazionale
      tagConnect: [11,5],
    },
    {
      title: 'Startup e blogging: come raccontare la tua idea dal giorno uno',
      slug: 'startup-blogging-racconto-idea',
      image: 'https://source.unsplash.com/random/800x400?startup,blog',
      content: 'Raccontare pubblicamente la nascita e la crescita di una startup aiuta a generare community, raccogliere feedback e attirare collaboratori: strategie vincenti spiegate con esempi concreti.',
      published: true,
      categoryId: categoryIds[3].id,
      authorId: userIds[2].id, // Chiara: community e nuovi blog
      tagConnect: [10,3],
    },
    // ARTICOLI EXTRA TEST PAGINAZIONE:
    {
      title: 'Micro-interazioni: piccoli dettagli, grandi impatti',
      slug: 'micro-interazioni-ux-ui',
      image: 'https://source.unsplash.com/random/800x400?ui,interaction',
      content: 'Le micro-interazioni migliorano l’usabilità e la soddisfazione dell’utente: quali implementare nel tuo prossimo progetto di UI.',
      published: true,
      categoryId: categoryIds[1].id, // Design
      authorId: userIds[2].id, // Chiara: UX expert
      tagConnect: [3,12,6],
    },
    {
      title: 'Motori di ricerca interni: architetture e best practices',
      slug: 'motori-ricerca-interni-best-practices',
      image: 'https://source.unsplash.com/random/800x400?search,architecture',
      content: 'Dalla strutturazione dei dati all’UX della ricerca: come progettare un motore di ricerca interno scalabile e veloce.',
      published: true,
      categoryId: categoryIds[0].id, // Tecnologia
      authorId: userIds[1].id, // Luca: backend/search
      tagConnect: [1,14,7],
    },
    {
      title: 'Algoritmi generativi per il content marketing',
      slug: 'algoritmi-generativi-content-marketing',
      image: 'https://source.unsplash.com/random/800x400?ai,content',
      content: 'Dall’AI generativa ai plugin, ecco la nuova frontiera dell’automazione nella produzione di contenuti.',
      published: true,
      categoryId: categoryIds[4].id, // Content Marketing
      authorId: userIds[0].id, // Marta: AI/content
      tagConnect: [4,11,15],
    },
    {
      title: 'Sicurezza API REST: cosa devi sapere nel 2025',
      slug: 'sicurezza-api-rest-2025',
      image: 'https://source.unsplash.com/random/800x400?api,security',
      content: 'Le ultime strategie per proteggere endpoint, autenticazione JWT e prevenire attacchi comuni con Node.js.',
      published: true,
      categoryId: categoryIds[0].id, 
      authorId: userIds[1].id, // Luca: sicurezza
      tagConnect: [13,8,1], 
    },
    {
      title: 'Startup al femminile: storie, sfide e community',
      slug: 'startup-femminili-italia-community',
      image: 'https://source.unsplash.com/random/800x400?startup,women',
      content: 'Un approfondimento sulle fondatrici tech in Italia, con interviste esclusive e casi di successo.',
      published: true,
      categoryId: categoryIds[3].id, // Startup
      authorId: userIds[0].id, // Marta: innovazione/diversità
      tagConnect: [10,9],
    },
  ];

  // CREA ARTICOLI E ASSOCIA I TAG (many-to-many)
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
          connect: item.tagConnect.map(id => ({ id: tagIds[id - 1].id })), // mappa ai reali ID dei tag
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

// Esegui dopo aver resettato il db con: npx prisma migrate reset && npx prisma db seed
// NB: Non serve lanciare subito dopo anche npx prisma db seed, perché reset lo esegue già di default.