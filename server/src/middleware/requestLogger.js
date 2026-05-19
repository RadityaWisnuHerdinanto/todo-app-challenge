/**
 * Request logging middleware
 * Logs incoming requests with method, URL, and response time
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};
