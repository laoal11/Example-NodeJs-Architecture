const logger = require('./logger')

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    logger.error("Error thrown: with status " + statusCode + " and message: " + message)
    res.status(statusCode).send(message);
}

module.exports = {
    ErrorHandler,
    handleError
}