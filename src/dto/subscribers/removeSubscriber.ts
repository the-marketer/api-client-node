import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const removeSubscriberSchema = z.object({
  email: z.string().min(1).email(),
  channels: z.string().optional().nullable(),
});

export type RemoveSubscriber = z.infer<typeof removeSubscriberSchema>;

export function parseRemoveSubscriber(data: unknown): RemoveSubscriber {
  return validateAndCreate(removeSubscriberSchema, data);
}

export function removeSubscriberToApiPayload(dto: RemoveSubscriber): Record<string, unknown> {
  return filterNonEmpty({ email: dto.email, channels: dto.channels }) as Record<string, unknown>;
}
