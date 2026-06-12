/**
 * Thrown when the API responds with 404 for a subscriber/customer lookup (e.g. status_subscriber).
 */
export class CustomerNotFoundException extends Error {
  readonly code: number;

  constructor(message = '', code = 404, options?: { cause?: unknown }) {
    super(message !== '' ? message : 'Customer not found', options);
    this.name = 'CustomerNotFoundException';
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
