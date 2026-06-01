// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // MongoDB Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // MongoDB Duplicate Key
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value: ${Object.keys(err.keyValue)}`;
  }


  // MongoDB Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(", ");
  }

  // JWT Invalid
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  // JWT Expired
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired, please login again";
  }

  // Unauthorized
  if (err.message === "Not authorized") {
    statusCode = 401;
  }

  // Forbidden
  if (err.message === "Access denied") {
    statusCode = 403;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack
  });
};

module.exports = errorHandler;