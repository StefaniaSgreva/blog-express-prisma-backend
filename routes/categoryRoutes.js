const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { body } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');

// GET tutte le categorie
router.get('/', categoryController.index);

// GET categoria per ID
router.get('/:id', categoryController.show);

// POST nuova categoria con validazione
router.post(
  '/',
  body('name')
    .notEmpty({ ignore_whitespace: true }).withMessage('Il nome è obbligatorio')
    .isLength({ max: 50 }).withMessage('Il nome può contenere massimo 50 caratteri'),
  validationMiddleware,
  categoryController.store
);

// PUT aggiorna categoria per ID con validazione
router.put(
  '/:id',
  body('name')
    .optional()
    .notEmpty({ ignore_whitespace: true }).withMessage('Il nome è obbligatorio se fornito')
    .isLength({ max: 50 }).withMessage('Il nome può contenere massimo 50 caratteri'),
  validationMiddleware,
  categoryController.update
);

// DELETE categoria per ID
router.delete('/:id', categoryController.destroy);

module.exports = router;
