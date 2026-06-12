import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const saveCouponSchema = z.object({
  code: z.string().min(1), type: z.string().min(1), value: z.string().min(1),
  expiration_date: z.string().min(1), email: z.string().optional().nullable(),
});
export type SaveCoupon = z.infer<typeof saveCouponSchema>;
export const parseSaveCoupon = (d: unknown) => validateAndCreate(saveCouponSchema, d);
export const saveCouponToApiPayload = (dto: SaveCoupon) => defaultToApiPayload(dto);
