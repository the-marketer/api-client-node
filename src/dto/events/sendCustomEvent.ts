import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const sendCustomEventSchema = z.object({ email: z.string().min(1).email(), event: z.string().min(1) });
export type SendCustomEvent = z.infer<typeof sendCustomEventSchema>;
export const parseSendCustomEvent = (d: unknown) => validateAndCreate(sendCustomEventSchema, d);
export const sendCustomEventToApiPayload = (dto: SendCustomEvent) => defaultToApiPayload(dto);
