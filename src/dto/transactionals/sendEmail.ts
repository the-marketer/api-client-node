import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const sendEmailSchema = z.object({
  to: z.string().min(1).email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  from: z.string().optional().nullable(),
  reply_to: z.string().email().optional().nullable(),
  attachments: z.array(z.unknown()).optional().nullable(),
});

export type SendEmail = z.infer<typeof sendEmailSchema>;

export function parseSendEmail(data: unknown): SendEmail {
  const raw = data as Record<string, unknown>;
  const trimmed: Record<string, unknown> = { ...raw };
  for (const key of ['to', 'from', 'reply_to'] as const) {
    if (typeof trimmed[key] === 'string') {
      const v = (trimmed[key] as string).trim();
      trimmed[key] = v === '' && key !== 'to' ? null : v;
    }
  }
  return validateAndCreate(sendEmailSchema, trimmed);
}

export function sendEmailToApiPayload(dto: SendEmail): Record<string, unknown> {
  const body: Record<string, unknown> = { to: dto.to, subject: dto.subject, body: dto.body };
  Object.assign(body, filterNonEmpty({ from: dto.from, reply_to: dto.reply_to }));
  if (dto.attachments != null && dto.attachments.length > 0) body.attachments = dto.attachments;
  return body;
}
