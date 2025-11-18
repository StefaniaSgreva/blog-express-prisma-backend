class NotFoundError extends Error {
    constructor(message = "Risorsa non trovata") {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;
    }
}

module.exports = NotFoundError;