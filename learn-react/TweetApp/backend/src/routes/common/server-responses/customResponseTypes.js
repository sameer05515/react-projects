// backend\src\routes\common\server-responses\customErrors.js

const { StatusCodes, ReasonPhrases } = require('http-status-codes');

class ValidationError extends Error {
  constructor(message,data = null) {
    super(message);
    this.name = "ValidationError";
    this.data = data; // Optional data field
    this.statusCode = StatusCodes.BAD_REQUEST; // HTTP Bad Request
  }
}

class DatabaseError extends Error {
  constructor(message,data = null) {
    super(message);
    this.name = "DatabaseError";
    this.data = data; // Optional data field
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR; // HTTP Internal Server Error
  }
}

class NotFoundError extends Error {
  constructor(message,data = null) {
    super(message);
    this.name = "NotFoundError";
    this.data = data; // Optional data field
    this.statusCode = StatusCodes.NOT_FOUND; // HTTP Not Found
  }
}

class SuccessCongratulations {
  constructor(data = null, message, statusCode = StatusCodes.OK) {
    this.message = message || 'Operation completed Successfully!'; // Success message
    this.name = "SuccessCongratulations"; // Custom success name
    this.statusCode = statusCode || StatusCodes.OK; // Custom status code, default to 200
    this.data = data; // Optional data field
    this.timeStamp = new Date().toISOString(); // Timestamp for the response
  }
}

module.exports = {
  ValidationError,
  DatabaseError,
  NotFoundError,
  SuccessCongratulations
};
