import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const serveJavascriptEventSchema = z.object({ k: z.string().min(6).max(20) });
export type ServeJavascriptEvent = z.infer<typeof serveJavascriptEventSchema>;
export const parseServeJavascriptEvent = (d: unknown) => validateAndCreate(serveJavascriptEventSchema, d);
export const serveJavascriptEventToApiPayload = (dto: ServeJavascriptEvent) => defaultToApiPayload(dto);
