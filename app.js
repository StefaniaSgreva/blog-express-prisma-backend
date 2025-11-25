require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// ========================================
// MIDDLEWARES BASE
// ========================================

// ===== SVILUPPO FRONTEND (Vue/Vite) =====
// Permetti richieste da qualsiasi origine per test locale
app.use(cors());

// ===== PRODUZIONE =====
// Per la sicurezza, limita le origini consentite:
// app.use(cors({ origin: 'https://TUO-DOMINIO.com' }));

// Parsing corpo delle richieste JSON (sia in sviluppo che produzione)
app.use(express.json());


// ========================================
// ROUTES
// ========================================
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const authRoutes = require('./routes/authRoutes');

// Monta le rotte principali
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes);
app.use('/tags', tagRoutes);

// ===== SVILUPPO FRONTEND =====
// Rotte di autenticazione root (login, register senza prefisso)
// Permette di testare facilmente dal FE
app.use('', authRoutes);

app.use('/uploads', express.static('uploads'));

// ===== PRODUZIONE =====
// Di solito si prefissa con /auth per chiarezza:
// app.use('/auth', authRoutes);


// ========================================
// ERROR HANDLING
// ========================================

// Middleware 404: route non trovata
// (Attivo sia in sviluppo che produzione)
const routeNotFound = require('./middlewares/routeNotFound');
app.use(routeNotFound);

// Middleware globale per gestione errori
// (Attivo sia in sviluppo che produzione)
const errorsHandler = require('./middlewares/errorsHandler');
app.use(errorsHandler);


// ========================================
// AVVIO SERVER
// ========================================

// ===== SVILUPPO FRONTEND =====
// Porta tipica: 3000 (puoi cambiare nel .env)
const PORT = process.env.PORT || 3000;

// ===== PRODUZIONE =====
// Porta può essere dettata dal servizio cloud/VPS
// (lascia così, si adatta automaticamente)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
