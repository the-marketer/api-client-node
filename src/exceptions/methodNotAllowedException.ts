/**
 * Thrown when the API responds with HTTP 405 (wrong HTTP verb for the route).
 */
export class MethodNotAllowedException extends Error {
  readonly code: number;

  constructor(message = '', code = 405, options?: { cause?: unknown }) {
    super(message !== '' ? message : 'Method not allowed', options);
    this.name = 'MethodNotAllowedException';
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
