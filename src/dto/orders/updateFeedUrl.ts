import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
/** Allowed feed types, shared by the schema and the API method signatures. */
export const feedTypeSchema = z.enum(['product', 'category', 'brand']);
export type FeedType = z.infer<typeof feedTypeSchema>;
export const updateFeedUrlSchema = z.object({
  url: z.string().url(),
  type: feedTypeSchema.optional().nullable(),
});
export type UpdateFeedUrl = z.infer<typeof updateFeedUrlSchema>;
export const parseUpdateFeedUrl = (d: unknown) => validateAndCreate(updateFeedUrlSchema, d);
export function updateFeedUrlToApiPayload(dto: UpdateFeedUrl): Record<string, unknown> {
  const payload: Record<string, unknown> = { url: dto.url };
  if (dto.type != null) payload.type = dto.type;
  return payload;
}
