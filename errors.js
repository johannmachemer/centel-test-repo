class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

class ValidationError extends AppError {
  constructor(field, reason) {
    super(`Validation failed for ${field}: ${reason}`, 400);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function handleError(err) {
  if (err instanceof AppError) {
    return { status: err.statusCode, message: err.message };
  }
  return { status: 500, message: 'Internal server error' };
}

module.exports = { AppError, NotFoundError, ValidationError, handleError };
