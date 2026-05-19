/**
 * Error handling middleware
 * Catches and formats errors for consistent API responses
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Prisma validation error
  if (err.code === "P2002") {
    statusCode = 409;
    message = `${err.meta?.target?.[0] || "Field"} already exists`;
  }

  // Prisma not found error
  if (err.code === "P2025") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { error: err.stack }),
  });
};

/**
 * Async route handler wrapper
 * Catches errors from async route handlers and passes them to error middleware
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
