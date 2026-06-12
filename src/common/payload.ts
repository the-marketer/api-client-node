import type { ZodType } from 'zod';
import { ValidationException } from '../exceptions/validationException';

/**
 * Removes null and empty-string values (equivalent to AbstractPayload::filterNonEmpty).
 */
export function filterNonEmpty<T extends Record<string, unknown>>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== null && v !== ''),
  ) as Partial<T>;
}

/**
 * Trims leading/trailing whitespace on listed string keys.
 */
export function trimStringFields<T extends Record<string, unknown>>(
  data: T,
  keys: string[],
): T {
  const result = { ...data };
  for (const key of keys) {
    const value = result[key];
    if (typeof value === 'string') {
      (result as Record<string, unknown>)[key] = value.trim();
    }
  }
  return result;
}

/**
 * Coerces numeric strings to int/float (e.g. from JSON or form data).
 */
export function coerceNumericStrings<T extends Record<string, unknown>>(
  data: T,
  intKeys: string[],
  floatKeys: string[],
): T {
  const result = { ...data };
  for (const key of intKeys) {
    const value = result[key];
    if (typeof value === 'string' && value !== '' && !Number.isNaN(Number(value))) {
      (result as Record<string, unknown>)[key] = parseInt(value, 10);
    }
  }
  for (const key of floatKeys) {
    const value = result[key];
    if (typeof value === 'string' && value !== '' && !Number.isNaN(Number(value))) {
      (result as Record<string, unknown>)[key] = parseFloat(value);
    }
  }
  return result;
}

/**
 * Parses input with a Zod schema; throws ValidationException with "path: message" pairs.
 */
export function validateAndCreate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const messages = result.error.issues
      .map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join('.') : '(root)';
        return `${path}: ${issue.message}`;
      })
      .join(', ');
    throw new ValidationException(messages);
  }
  return result.data;
}
