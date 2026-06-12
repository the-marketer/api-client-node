import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const setMobilePushTokenSchema = z.object({
  email: z.string().min(1).email(), token: z.string().min(1), type: z.enum(['ios', 'android']),
});
export type SetMobilePushToken = z.infer<typeof setMobilePushTokenSchema>;
export const parseSetMobilePushToken = (d: unknown) => validateAndCreate(setMobilePushTokenSchema, d);
export const setMobilePushTokenToApiPayload = (dto: SetMobilePushToken) => defaultToApiPayload(dto);
