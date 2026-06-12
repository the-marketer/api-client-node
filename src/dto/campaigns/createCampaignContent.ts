import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const createCampaignContentSchema = z.object({ html: z.string().min(1).max(512000) });
export type CreateCampaignContent = z.infer<typeof createCampaignContentSchema>;
export const parseCreateCampaignContent = (d: unknown) => validateAndCreate(createCampaignContentSchema, d);
export const createCampaignContentToApiPayload = (dto: CreateCampaignContent) => defaultToApiPayload(dto);
