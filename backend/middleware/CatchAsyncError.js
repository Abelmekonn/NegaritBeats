const catchAsyncError = (theFun) => (req, res, next) => {
    Promise.resolve(theFun(req, res, next)).catch(next);
};

export default catchAsyncError; // Use named or default export
