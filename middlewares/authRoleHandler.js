const AuthError = require("../exceptions/AuthError");

/**
 * Middleware per controllo ruolo con supporto a singolo ruolo o array di ruoli
 * @param {string|string[]} roles - Ruolo singolo o array di ruoli autorizzati
 * @returns Middleware Express
 */
module.exports = function(roles) {
  // Normalizza in array se roles è stringa singola
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return function(req, res, next) {
    if (!roles.includes(req.user.role)) {
      throw new AuthError("Non hai i permessi per accedere a questa risorsa");
    }
    next();
  };
};
