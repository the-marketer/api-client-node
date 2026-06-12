import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { trackingEventToApiPayload } from '../helpers';
export const searchEventSchema = z.object({
  did: z.string().min(1), event: z.string().min(1), search_term: z.string().min(1),
  url: z.string().url(), http_user_agent: z.string().min(1), remote_addr: z.string().min(1),
  source: z.string().optional().nullable(),
});
export type SearchEvent = z.infer<typeof searchEventSchema>;
export const parseSearchEvent = (d: unknown) => validateAndCreate(searchEventSchema, d);
export function searchEventToApiPayload(dto: SearchEvent): Record<string, unknown> {
  return trackingEventToApiPayload({
    did: dto.did, event: dto.event, search_term: dto.search_term, url: dto.url,
    http_user_agent: dto.http_user_agent, remote_addr: dto.remote_addr,
  }, dto.source);
}
