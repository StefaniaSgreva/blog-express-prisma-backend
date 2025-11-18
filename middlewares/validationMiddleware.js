const { validationResult } = require('express-validator');

function validationMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Errore di validazione');
    error.status = 400;
    error.errors = errors.array();
    return next(error);
  }
  next();
}

module.exports = validationMiddleware;
