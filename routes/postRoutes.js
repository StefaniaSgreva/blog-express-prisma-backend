const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Validazione dati post
const { body, checkSchema } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');
const postCreate = require('../validations/postCreate');

// Middleware autenticazione/ruoli
const authenticateJWT = require('../middlewares/authenticateJWT');
const checkRole = require('../middlewares/authRoleHandler');
const authorizePostOwner = require('../middlewares/authorizePostOwner');

// multer (upload images)
const path = require('path');
const multer = require('multer');

// Configurazione con storage custom per nome + estensione
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
  }
});
const upload = multer({ storage });

// ==================================================================
// DEV MODE (Frontend, Vue/Vite) - SENZA auth e validazione avanzata
// ==================================================================

// Recupera tutti i post con eventuali filtri
router.get('/', postController.index);

// Recupera singolo post tramite slug
router.get('/:slug', postController.show);

// Crea un nuovo post (DEV): nessun middleware, nessuna validazione
// router.post('/', postController.store);
router.post('/', upload.single('image'), postController.store);

// Aggiorna un post tramite slug (DEV): nessun middleware, nessuna validazione
router.put('/:slug', postController.update);

// Elimina un post tramite slug (DEV): nessun middleware
router.delete('/:slug', postController.destroy);

/*
============================================
PROD MODE (scommenta per produzione sicura)
============================================

// Crea un nuovo post con auth, validazione e ruoli
// router.post(
//   '/',
//   authenticateJWT,
//   checkRole(['admin', 'editor', 'user']),
//   checkSchema(postCreate),
//   validationMiddleware,
//   postController.store
// );

// Aggiorna un post con auth, ruoli, validazione avanzata
// router.put(
//   '/:slug',
//   authenticateJWT,
//   checkRole(['admin', 'editor', 'user']),
//   authorizePostOwner('update'),
//   // Validazioni campo
//   body("title")
//     .optional()
//     .notEmpty({ ignore_whitespace: true }).withMessage('Il titolo è obbligatorio se fornito')
//     .isLength({ max: 100 }).withMessage('Il titolo deve contenere massimo 100 caratteri'),
//   body('slug')
//     .optional()
//     .notEmpty({ ignore_whitespace: true }).withMessage('Lo slug è obbligatorio se fornito')
//     .isSlug().withMessage('Lo Slug deve essere uno slug valido'),
//   body('content')
//     .optional()
//     .notEmpty({ ignore_whitespace: true }).withMessage('Il contenuto è obbligatorio se fornito'),
//   body('categoryId')
//     .optional()
//     .isInt().withMessage('Category ID deve essere un numero intero'),
//   body('tags')
//     .optional()
//     .isArray().withMessage('Tags deve essere un array'),
//   validationMiddleware,
//   postController.update
// );

// Elimina un post con auth e ruoli
// router.delete(
//   '/:slug',
//   authenticateJWT,
//   checkRole(['admin', 'user']),
//   authorizePostOwner('delete'),
//   postController.destroy
// );

*/

module.exports = router;
