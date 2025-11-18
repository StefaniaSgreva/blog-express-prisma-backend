const NotFoundError = require("../exceptions/NotFoundError");
const { sendRes } = require("../middlewares/errorsHandler"); // importa la funzione sendRes

function routeNotFound(req, res, next) {
    const notFoundError = new NotFoundError();
    // Usa direttamente sendRes per inviare la risposta 404
    return sendRes(notFoundError, res);
}

module.exports = routeNotFound;
