import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const syncCategorySchema = z.object({
  id: z.string().min(1), name: z.string().min(1), hierarchy: z.string().min(1),
  url: z.string().min(1), image_url: z.string().min(1),
});
export type SyncCategory = z.infer<typeof syncCategorySchema>;
export const parseSyncCategory = (d: unknown) => validateAndCreate(syncCategorySchema, d);
export const syncCategoryToApiPayload = (dto: SyncCategory) => defaultToApiPayload(dto);
