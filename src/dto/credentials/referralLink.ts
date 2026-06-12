import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { filterNonEmpty } from '../../common/payload';
export const referralLinkSchema = z.object({ email: z.string().email().optional().nullable() });
export type ReferralLink = z.infer<typeof referralLinkSchema>;
export const parseReferralLink = (d: unknown) => validateAndCreate(referralLinkSchema, d);
export const referralLinkToApiPayload = (dto: ReferralLink) => filterNonEmpty({ email: dto.email }) as Record<string, unknown>;
