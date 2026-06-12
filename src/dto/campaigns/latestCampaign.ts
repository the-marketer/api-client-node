import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const latestCampaignSchema = z.object({ limit: z.number().int().positive().optional().nullable() });
export type LatestCampaign = z.infer<typeof latestCampaignSchema>;
export const parseLatestCampaign = (d: unknown) => validateAndCreate(latestCampaignSchema, d);
export const latestCampaignToApiPayload = (dto: LatestCampaign) => defaultToApiPayload(dto);
