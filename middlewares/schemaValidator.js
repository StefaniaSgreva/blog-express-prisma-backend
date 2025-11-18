const { validationResult, checkSchema } = require("express-validator");

function checkValidity(req, res, next) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return res.status(422).json(validation.array());
    }

    next();
}

/**
 * Metodo che ritorna un array di middleware per la validazione dello schema
 * @param {*} schema 
 * @returns Middleware array
 */
module.exports = function (schema) {
    return [
        checkSchema(schema),  // esegue la validazione basata sullo schema
        checkValidity        // controlla errori e risponde se presenti
    ];
};
