/**
 * Thrown for API error responses that are not mapped to a more specific exception
 * (e.g. 400, 403, 422, 5xx) with decoded body text.
 */
export class ApiException extends Error {
  readonly code: number;

  constructor(message = '', code = 500, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'ApiException';
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
