import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';

export const unsubscribedEmailsSchema = z.object({
  date_from: z.string().min(1),
  date_to: z.string().min(1),
});

export type UnsubscribedEmails = z.infer<typeof unsubscribedEmailsSchema>;

export function parseUnsubscribedEmails(data: unknown): UnsubscribedEmails {
  return validateAndCreate(unsubscribedEmailsSchema, data);
}

export function unsubscribedEmailsToApiPayload(dto: UnsubscribedEmails): Record<string, unknown> {
  return defaultToApiPayload(dto);
}
