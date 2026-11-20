import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';
export const manageLoyaltyPointsSchema = z
  .object({
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
    action: z.enum(['increase', 'decrease']),
    points: z.number().int().positive(),
  })
  .refine((d) => (d.email != null && d.email !== '') || (d.phone != null && d.phone !== ''), {
    message: 'Either email or phone is required.',
  });
export type ManageLoyaltyPoints = z.infer<typeof manageLoyaltyPointsSchema>;
export const parseManageLoyaltyPoints = (d: unknown) => validateAndCreate(manageLoyaltyPointsSchema, d);
export const manageLoyaltyPointsToApiPayload = (dto: ManageLoyaltyPoints) =>
  filterNonEmpty({ email: dto.email, phone: dto.phone, action: dto.action, points: dto.points }) as Record<string, unknown>;
