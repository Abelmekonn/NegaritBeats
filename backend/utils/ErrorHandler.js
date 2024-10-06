const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if not provided
    const message = err.message || 'Internal Server Error'; // Default message

    // Log the error (optional)
    console.error(err);

    // Send the error response
    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default ErrorHandler;
