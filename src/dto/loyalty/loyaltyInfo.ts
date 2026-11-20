import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const loyaltyInfoSchema = z
  .object({
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
  })
  .refine((d) => (d.email != null && d.email !== '') || (d.phone != null && d.phone !== ''), {
    message: 'Either email or phone is required.',
  });

export type LoyaltyInfo = z.infer<typeof loyaltyInfoSchema>;
export const parseLoyaltyInfo = (d: unknown) => validateAndCreate(loyaltyInfoSchema, d);
export const loyaltyInfoToApiPayload = (dto: LoyaltyInfo) =>
  filterNonEmpty({ email: dto.email, phone: dto.phone }) as Record<string, unknown>;
