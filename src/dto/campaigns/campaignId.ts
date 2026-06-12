import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const campaignIdSchema = z.object({ id: z.string().min(1) });
export type CampaignId = z.infer<typeof campaignIdSchema>;
export const parseCampaignId = (d: unknown) => validateAndCreate(campaignIdSchema, d);
export const campaignIdToApiPayload = (dto: CampaignId) => defaultToApiPayload(dto);
