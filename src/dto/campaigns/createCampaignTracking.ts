import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const createCampaignTrackingSchema = z.object({
  utm_campaign: z.string().min(1), utm_medium: z.string().min(1), utm_source: z.string().min(1),
});
export type CreateCampaignTracking = z.infer<typeof createCampaignTrackingSchema>;
export const parseCreateCampaignTracking = (d: unknown) => validateAndCreate(createCampaignTrackingSchema, d);
export const createCampaignTrackingToApiPayload = (dto: CreateCampaignTracking) => defaultToApiPayload(dto);
