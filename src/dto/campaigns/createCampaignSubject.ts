import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const createCampaignSubjectSchema = z.object({
  name: z.string().min(1), subject_line: z.string().min(1), preview_text: z.string().min(1),
});
export type CreateCampaignSubject = z.infer<typeof createCampaignSubjectSchema>;
export const parseCreateCampaignSubject = (d: unknown) => validateAndCreate(createCampaignSubjectSchema, d);
export const createCampaignSubjectToApiPayload = (dto: CreateCampaignSubject) => defaultToApiPayload(dto);
