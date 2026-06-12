import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const deleteSubscriberSchema = z
  .object({
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
  })
  .refine((d) => (d.email != null && d.email !== '') || (d.phone != null && d.phone !== ''), {
    message: 'Either email or phone is required.',
  });

export type DeleteSubscriber = z.infer<typeof deleteSubscriberSchema>;

export function parseDeleteSubscriber(data: unknown): DeleteSubscriber {
  return validateAndCreate(deleteSubscriberSchema, data);
}

export function deleteSubscriberToApiPayload(dto: DeleteSubscriber): Record<string, unknown> {
  return filterNonEmpty({ email: dto.email, phone: dto.phone }) as Record<string, unknown>;
}
