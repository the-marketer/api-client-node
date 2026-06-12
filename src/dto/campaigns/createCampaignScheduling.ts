import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const createCampaignSchedulingSchema = z.object({
  send_at: z.string().min(1),
  use_optimal_time: z.union([z.literal(0), z.literal(1)]),
  optimize_for: z.enum(['opening', 'buying']),
});
export type CreateCampaignScheduling = z.infer<typeof createCampaignSchedulingSchema>;
export function parseCreateCampaignScheduling(data: unknown): CreateCampaignScheduling {
  const raw = { ...(data as Record<string, unknown>) };
  if (typeof raw.use_optimal_time === 'string' && raw.use_optimal_time !== '' && !Number.isNaN(Number(raw.use_optimal_time))) {
    raw.use_optimal_time = parseInt(raw.use_optimal_time as string, 10) as 0 | 1;
  }
  return validateAndCreate(createCampaignSchedulingSchema, raw);
}
export const createCampaignSchedulingToApiPayload = (dto: CreateCampaignScheduling) => defaultToApiPayload(dto);
