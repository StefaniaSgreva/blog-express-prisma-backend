/**
 * Middleware globale per la gestione degli errori.
 */
function errorsHandler(err, req, res, next) {
    // Controlla se l'errore è un SyntaxError causato dal parsing JSON malformato
    // express.json() genera questo errore quando il corpo della richiesta non è un JSON valido
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Risponde con codice 400 (Bad Request) e messaggio chiaro per indicare JSON malformato
        return res.status(400).json({ message: "Malformed JSON", error: "SyntaxError" });
    }
    // Altri errori: stampa lo stack trace per debug
    console.error(err.stack);

    // Usa la funzione di invio risposta generica per gestire l'errore
    sendRes(err, res);
}


/**
 * Funzione riutilizzabile per inviare la risposta di errore.
 * 
 * @param {Object} err - Oggetto errore
 * @param {Object} res - Oggetto risposta Express
 */
function sendRes(err, res) {
    // Imposta lo status code, il messaggio e altri dettagli
    return res.status(err.status ?? 500).json({
        message: err.message || "Errore interno del server",
        error: err.constructor?.name || "Error",
        errors: err.errors ?? [],
    });
}

// Esporta sia il middleware che la funzione di invio risposta
module.exports = errorsHandler;
module.exports.sendRes = sendRes;
