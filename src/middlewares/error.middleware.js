const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log("in middleware", statusCode);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
