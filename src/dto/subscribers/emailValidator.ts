import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';

export const emailValidatorSchema = z.object({
  email: z.string().min(1).email(),
});

export type EmailValidator = z.infer<typeof emailValidatorSchema>;

export function parseEmailValidator(data: unknown): EmailValidator {
  return validateAndCreate(emailValidatorSchema, data);
}

export function emailValidatorToApiPayload(dto: EmailValidator): Record<string, unknown> {
  return defaultToApiPayload(dto);
}
