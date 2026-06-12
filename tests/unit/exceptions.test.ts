import { describe, expect, it } from 'vitest';
import {
  ApiException,
  CustomerNotFoundException,
  MethodNotAllowedException,
  UnauthorizedException,
  ValidationException,
} from '../../src/exceptions';

describe('exceptions', () => {
  it('ApiException stores message and code', () => {
    const e = new ApiException('msg', 422);

    expect(e.message).toBe('msg');
    expect(e.code).toBe(422);
  });

  it('ValidationException defaults to 400', () => {
    const e = new ValidationException('bad');

    expect(e.code).toBe(400);
  });

  it('UnauthorizedException stores message and code', () => {
    const e = new UnauthorizedException('nope', 401);

    expect(e.message).toBe('nope');
    expect(e.code).toBe(401);
  });

  it('CustomerNotFoundException stores code', () => {
    const e = new CustomerNotFoundException('missing', 404);

    expect(e.code).toBe(404);
  });

  it('MethodNotAllowedException stores code', () => {
    const e = new MethodNotAllowedException('GET only', 405);

    expect(e.code).toBe(405);
  });
});
