const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Handle MongoDB CastError
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        err = new ErrorHandler(message, 400);
    }

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        const message = `Duplicated ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handle JWT TokenExpiredError
    if (err.name === 'TokenExpiredError') {
        const message = 'Your token has expired, please log in again';
        err = new ErrorHandler(message, 400);
    }

    // Handle JWT JsonWebTokenError
    if (err.name === 'JsonWebTokenError') {
        const message = 'Your token is invalid, please log in again';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
