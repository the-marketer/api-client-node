import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const sendSmsSchema = z.object({ to: z.string().min(1), content: z.string().min(1) });
export type SendSms = z.infer<typeof sendSmsSchema>;
export const parseSendSms = (d: unknown) => validateAndCreate(sendSmsSchema, d);
export const sendSmsToApiPayload = (dto: SendSms) => defaultToApiPayload(dto);
