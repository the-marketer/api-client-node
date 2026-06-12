import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const updateTagsSchema = z.object({
  email: z.string().min(1).email(),
  add_tags: z.array(z.union([z.string(), z.number()])).optional().nullable(),
  remove_tags: z.array(z.union([z.string(), z.number()])).optional().nullable(),
  overwrite_existing: z.number().optional().nullable(),
});

export type UpdateTags = z.infer<typeof updateTagsSchema>;

export function parseUpdateTags(data: unknown): UpdateTags {
  return validateAndCreate(updateTagsSchema, data);
}

export function updateTagsToApiPayload(dto: UpdateTags): Record<string, unknown> {
  const body: Record<string, unknown> = { email: dto.email };
  const overwrite = filterNonEmpty({ overwrite_existing: dto.overwrite_existing });
  if ('overwrite_existing' in overwrite) {
    body.overwrite_existing = overwrite.overwrite_existing;
  }
  if (dto.add_tags != null && dto.add_tags.length > 0) {
    body.add_tags = dto.add_tags;
  }
  if (dto.remove_tags != null && dto.remove_tags.length > 0) {
    body.remove_tags = dto.remove_tags;
  }
  return body;
}
