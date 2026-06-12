import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const manageLoyaltyPointsSchema = z.object({
  email: z.string().min(1).email(),
  action: z.enum(['increase', 'decrease']),
  points: z.number().int().positive(),
});
export type ManageLoyaltyPoints = z.infer<typeof manageLoyaltyPointsSchema>;
export const parseManageLoyaltyPoints = (d: unknown) => validateAndCreate(manageLoyaltyPointsSchema, d);
export const manageLoyaltyPointsToApiPayload = (dto: ManageLoyaltyPoints) => defaultToApiPayload(dto);
