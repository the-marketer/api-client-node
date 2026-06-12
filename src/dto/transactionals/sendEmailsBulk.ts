import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { parseSendEmail, sendEmailSchema, sendEmailToApiPayload } from './sendEmail';

export const sendEmailsBulkSchema = z.object({ emails: z.array(sendEmailSchema).min(1) });
export type SendEmailsBulk = z.infer<typeof sendEmailsBulkSchema>;

export function parseSendEmailsBulk(data: unknown): SendEmailsBulk {
  const raw = data as Record<string, unknown>;
  const emails = (Array.isArray(raw.emails) ? raw.emails : []).map((item) => parseSendEmail(item));
  return validateAndCreate(sendEmailsBulkSchema, { emails });
}

export function sendEmailsBulkToApiPayload(dto: SendEmailsBulk): Record<string, unknown> {
  return { emails: dto.emails.map((e) => sendEmailToApiPayload(e)) };
}
