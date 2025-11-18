const AuthError = require("../exceptions/AuthError");
const jsonwebtoken = require('jsonwebtoken');

/**
 * @param {import("express").Request} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    // leggere il Bearer Token dal header della richiesta
    // Stringa che inizia con Bearer seguita da uno spazio e poi il token
    const bearer = req.headers.authorization;
    // controllo il bearer
    if(!bearer || !bearer.startsWith("Bearer")){
        throw new AuthError("Bearer token mancante o malformato");
    }
    // estraggo il token
    const token = bearer.split(" ")[1];

    // verificare che il token sia valido
    // il verify da solo lancia degli errori in caso di token non valido o scaduto
    // estrarre i dati dell'utente dal token. Il verify ritorna il payload del token, quindi l'utente
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // passare i dati dell'utente alla req in modo che possiamo accederci nei controller
    req["user"] = user;

    // invocare next() per far andare avanti il middleware
    next();
}