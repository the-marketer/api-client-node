import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const listCampaignSchema = z.object({
  filters: z.string().optional().nullable(), 
  search: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  start_date: z.string().optional().nullable(),
  page: z.string().optional().nullable(), 
  limit: z.string().optional().nullable(),
})
;
export type ListCampaign = z.infer<typeof listCampaignSchema>;
export const parseListCampaign = (d: unknown) => validateAndCreate(listCampaignSchema, d);
export const listCampaignToApiPayload = (dto: ListCampaign) => filterNonEmpty(dto) as Record<string, unknown>;
