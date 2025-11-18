const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const { body } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');

// GET tutti i tag
router.get('/', tagController.index);

// GET tag per ID
router.get('/:id', tagController.show);

// POST crea un nuovo tag con validazione
router.post(
  '/', 
  body('name')
    .notEmpty({ ignore_whitespace: true }).withMessage('Il nome è obbligatorio')
    .isLength({ max: 50 }).withMessage('Il nome può contenere massimo 50 caratteri'),
  validationMiddleware,
  tagController.store
);

// PUT aggiorna tag per ID con validazione
router.put(
  '/:id',
  body('name')
    .optional()
    .notEmpty({ ignore_whitespace: true }).withMessage('Il nome è obbligatorio se fornito')
    .isLength({ max: 50 }).withMessage('Il nome può contenere massimo 50 caratteri'),
  validationMiddleware,
  tagController.update
);

// DELETE elimina tag per ID
router.delete('/:id', tagController.destroy);

module.exports = router;
