class AppError extends Error {
    constructor(message = "Errore interno del server", status = 500) {
        super(message);
        this.name = "AppError";
        this.status = status;
    }
}

module.exports = AppError;