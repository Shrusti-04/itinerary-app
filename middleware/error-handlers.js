const logger = require("../utils/logger");

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  logger.error("Unhandled error:", {
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Don't leak error details in production
  const message =
    process.env.NODE_ENV === "production"
      ? "An internal server error occurred"
      : err.message;

  res.status(err.status || 500).json({
    error: message,
  });
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  logger.http(`${req.method} ${req.path}`, {
    query: req.query,
    body: req.method === "POST" || req.method === "PUT" ? req.body : undefined,
  });
  next();
};

// Not found middleware
const notFound = (req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: "Route not found" });
};

module.exports = {
  errorHandler,
  requestLogger,
  notFound,
};
