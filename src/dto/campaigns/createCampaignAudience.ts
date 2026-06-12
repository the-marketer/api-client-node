import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const createCampaignAudienceSchema = z.object({
  audience_type: z.literal('all'), smart_sending: z.boolean(),
});
export type CreateCampaignAudience = z.infer<typeof createCampaignAudienceSchema>;
export const parseCreateCampaignAudience = (d: unknown) => validateAndCreate(createCampaignAudienceSchema, d);
export const createCampaignAudienceToApiPayload = (dto: CreateCampaignAudience) => defaultToApiPayload(dto);
