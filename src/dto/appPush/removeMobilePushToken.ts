import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const removeMobilePushTokenSchema = z.object({
  email: z.string().min(1).email(), type: z.enum(['ios', 'android']),
});
export type RemoveMobilePushToken = z.infer<typeof removeMobilePushTokenSchema>;
export const parseRemoveMobilePushToken = (d: unknown) => validateAndCreate(removeMobilePushTokenSchema, d);
export const removeMobilePushTokenToApiPayload = (dto: RemoveMobilePushToken) => defaultToApiPayload(dto);
