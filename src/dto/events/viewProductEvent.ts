import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { trackingEventToApiPayload } from '../helpers';
export const viewProductEventSchema = z.object({
  did: z.string().min(1), event: z.string().min(1), product_id: z.string().min(1),
  url: z.string().url(), http_user_agent: z.string().min(1), remote_addr: z.string().min(1),
  source: z.string().optional().nullable(),
});
export type ViewProductEvent = z.infer<typeof viewProductEventSchema>;
export const parseViewProductEvent = (d: unknown) => validateAndCreate(viewProductEventSchema, d);
export function viewProductEventToApiPayload(dto: ViewProductEvent): Record<string, unknown> {
  return trackingEventToApiPayload({
    did: dto.did, event: dto.event, product_id: dto.product_id, url: dto.url,
    http_user_agent: dto.http_user_agent, remote_addr: dto.remote_addr,
  }, dto.source);
}
