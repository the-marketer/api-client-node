import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const syncBrandSchema = z.object({
  id: z.string().min(1), name: z.string().min(1), url: z.string().min(1), image_url: z.string().min(1),
});
export type SyncBrand = z.infer<typeof syncBrandSchema>;
export const parseSyncBrand = (d: unknown) => validateAndCreate(syncBrandSchema, d);
export const syncBrandToApiPayload = (dto: SyncBrand) => defaultToApiPayload(dto);
