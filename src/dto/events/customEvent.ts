import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { trackingEventToApiPayload } from '../helpers';
export const customEventSchema = z.object({
  did: z.string().min(1), email: z.string().min(1).email(), event: z.string().min(1),
  url: z.string().url(), http_user_agent: z.string().min(1), remote_addr: z.string().min(1),
  source: z.string().optional().nullable(),
});
export type CustomEvent = z.infer<typeof customEventSchema>;
export const parseCustomEvent = (d: unknown) => validateAndCreate(customEventSchema, d);
export function customEventToApiPayload(dto: CustomEvent): Record<string, unknown> {
  return trackingEventToApiPayload({
    did: dto.did, email: dto.email, event: dto.event, url: dto.url,
    http_user_agent: dto.http_user_agent, remote_addr: dto.remote_addr,
  }, dto.source);
}
