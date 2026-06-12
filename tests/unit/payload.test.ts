import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  coerceNumericStrings,
  filterNonEmpty,
  trimStringFields,
  validateAndCreate,
} from '../../src/common/payload';
import { ValidationException } from '../../src/exceptions/validationException';

describe('filterNonEmpty', () => {
  it('removes null and empty strings', () => {
    expect(filterNonEmpty({ a: 1, b: null, c: '', d: 'x' })).toEqual({ a: 1, d: 'x' });
  });
});

describe('trimStringFields', () => {
  it('trims listed string keys', () => {
    expect(trimStringFields({ email: '  a@b.com  ', id: 1 }, ['email'])).toEqual({
      email: 'a@b.com',
      id: 1,
    });
  });

  it('ignores non-string values', () => {
    expect(trimStringFields({ n: 42 }, ['n'])).toEqual({ n: 42 });
  });
});

describe('coerceNumericStrings', () => {
  it('coerces int and float keys', () => {
    expect(
      coerceNumericStrings({ qty: '3', price: '9.99', label: 'x' }, ['qty'], ['price']),
    ).toEqual({ qty: 3, price: 9.99, label: 'x' });
  });

  it('leaves non-numeric strings unchanged', () => {
    expect(coerceNumericStrings({ qty: 'abc' }, ['qty'], [])).toEqual({ qty: 'abc' });
  });
});

describe('validateAndCreate', () => {
  const schema = z.object({ id: z.string() });

  it('returns parsed data on success', () => {
    expect(validateAndCreate(schema, { id: '42', extra: 'ignored' })).toEqual({ id: '42' });
  });

  it('throws ValidationException with path messages', () => {
    expect(() => validateAndCreate(schema, {})).toThrow(ValidationException);
    try {
      validateAndCreate(schema, {});
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationException);
      expect((e as ValidationException).message).toContain('id');
    }
  });
});
