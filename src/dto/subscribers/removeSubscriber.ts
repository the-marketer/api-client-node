import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const removeSubscriberSchema = z
  .object({
    email: z.string().email().optional().nullable(),
    channels: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
  })
  .refine((d) => (d.email != null && d.email !== '') || (d.phone != null && d.phone !== ''), {
    message: 'Either email or phone is required.',
  });

export type RemoveSubscriber = z.infer<typeof removeSubscriberSchema>;

export function parseRemoveSubscriber(data: unknown): RemoveSubscriber {
  return validateAndCreate(removeSubscriberSchema, data);
}

export function removeSubscriberToApiPayload(dto: RemoveSubscriber): Record<string, unknown> {
  return filterNonEmpty({ email: dto.email, phone: dto.phone, channels: dto.channels }) as Record<string, unknown>;
}
