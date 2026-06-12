import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const createCampaignSenderSchema = z.object({
  name: z.string().min(1), sender: z.string().min(1).email(), reply_to: z.string().min(1).email(),
});
export type CreateCampaignSender = z.infer<typeof createCampaignSenderSchema>;
export const parseCreateCampaignSender = (d: unknown) => validateAndCreate(createCampaignSenderSchema, d);
export const createCampaignSenderToApiPayload = (dto: CreateCampaignSender) => defaultToApiPayload(dto);
