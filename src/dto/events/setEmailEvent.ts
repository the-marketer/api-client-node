import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { trackingEventToApiPayload } from '../helpers';
export const setEmailEventSchema = z.object({
  did: z.string().min(1), event: z.string().min(1), email_address: z.string().min(1).email(),
  firstname: z.string().min(1), lastname: z.string().min(1), phone: z.string().min(1),
  url: z.string().url(), http_user_agent: z.string().min(1), remote_addr: z.string().min(1),
  source: z.string().optional().nullable(),
});
export type SetEmailEvent = z.infer<typeof setEmailEventSchema>;
export const parseSetEmailEvent = (d: unknown) => validateAndCreate(setEmailEventSchema, d);
export function setEmailEventToApiPayload(dto: SetEmailEvent): Record<string, unknown> {
  return trackingEventToApiPayload({
    did: dto.did, event: dto.event, email_address: dto.email_address,
    firstname: dto.firstname, lastname: dto.lastname, phone: dto.phone,
    url: dto.url, http_user_agent: dto.http_user_agent, remote_addr: dto.remote_addr,
  }, dto.source);
}
