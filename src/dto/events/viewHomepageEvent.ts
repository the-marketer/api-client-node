import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { trackingEventToApiPayload } from '../helpers';
export const viewHomepageEventSchema = z.object({ did: z.string().min(1), event: z.string().min(1), url: z.string().url(),
  http_user_agent: z.string().min(1), remote_addr: z.string().min(1), source: z.string().optional().nullable() });
export type ViewHomepageEvent = z.infer<typeof viewHomepageEventSchema>;
export const parseViewHomepageEvent = (d: unknown) => validateAndCreate(viewHomepageEventSchema, d);
export function viewHomepageEventToApiPayload(dto: ViewHomepageEvent): Record<string, unknown> {
  return trackingEventToApiPayload({
    did: dto.did, event: dto.event, url: dto.url,
    http_user_agent: dto.http_user_agent, remote_addr: dto.remote_addr,
  }, dto.source);
}
