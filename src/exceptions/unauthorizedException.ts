/**
 * Thrown when the API responds with HTTP 401 (e.g. invalid REST key).
 */
export class UnauthorizedException extends Error {
  readonly code: number;

  constructor(message = '', code = 401, options?: { cause?: unknown }) {
    super(message !== '' ? message : 'Unauthorized', options);
    this.name = 'UnauthorizedException';
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
