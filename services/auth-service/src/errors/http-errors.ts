export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class OkError extends HttpError {
  constructor(message = "OK", details?: unknown) {
    super(200, message, details);
  }
}

export class CreatedError extends HttpError {
  constructor(message = "Resource created successfully", details?: unknown) {
    super(201, message, details);
  }
}

export class AcceptedError extends HttpError {
  constructor(message = "Request accepted", details?: unknown) {
    super(202, message, details);
  }
}

export class NoContentError extends HttpError {
  constructor(message = "No content", details?: unknown) {
    super(204, message, details);
  }
}

export class MovedPermanentlyError extends HttpError {
  constructor(message = "Moved permanently", details?: unknown) {
    super(301, message, details);
  }
}

export class NotModifiedError extends HttpError {
  constructor(message = "Not modified", details?: unknown) {
    super(304, message, details);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad request", details?: unknown) {
    super(400, message, details);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", details?: unknown) {
    super(401, message, details);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden", details?: unknown) {
    super(403, message, details);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Resource not found", details?: unknown) {
    super(404, message, details);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message = "Method not allowed", details?: unknown) {
    super(405, message, details);
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflict", details?: unknown) {
    super(409, message, details);
  }
}

export class GoneError extends HttpError {
  constructor(message = "Resource gone", details?: unknown) {
    super(410, message, details);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message = "Unprocessable entity", details?: unknown) {
    super(422, message, details);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = "Too many requests", details?: unknown) {
    super(429, message, details);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal server error", details?: unknown) {
    super(500, message, details);
  }
}

export class NotImplementedError extends HttpError {
  constructor(message = "Not implemented", details?: unknown) {
    super(501, message, details);
  }
}

export class BadGatewayError extends HttpError {
  constructor(message = "Bad gateway", details?: unknown) {
    super(502, message, details);
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message = "Service unavailable", details?: unknown) {
    super(503, message, details);
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message = "Gateway timeout", details?: unknown) {
    super(504, message, details);
  }
}
