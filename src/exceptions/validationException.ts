/**
 * Thrown when required fields are missing or invalid before an HTTP request is sent.
 * Uses HTTP status code 400 by default.
 */
export class ValidationException extends Error {
  readonly code: number;

  constructor(message = '', code = 400, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'ValidationException';
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
