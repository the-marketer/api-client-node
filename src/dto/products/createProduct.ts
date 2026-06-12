import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';

export const createProductSchema = z.object({
  id: z.string().min(1), sku: z.string().min(1), name: z.string().min(1),
  description: z.string().min(1), url: z.string().min(1), main_image: z.string().min(1),
  category: z.string().min(1), brand: z.string().min(1),
  acquisition_price: z.number(), price: z.number(), sale_price: z.string().min(1),
  availability: z.number().int(), stock: z.number().int(),
  media_gallery: z.tuple([z.string().min(1), z.string().min(1)]),
  created_at: z.string().min(1),
  extra_attributes: z.record(z.string()).optional().nullable(),
  sale_price_start_date: z.string().optional().nullable(),
  sale_price_end_date: z.string().optional().nullable(),
});

export type CreateProduct = z.infer<typeof createProductSchema>;
export const parseCreateProduct = (d: unknown) => validateAndCreate(createProductSchema, d);

export function createProductToApiPayload(dto: CreateProduct): Record<string, unknown> {
  const payload = defaultToApiPayload(dto);
  if (dto.sale_price_start_date == null) delete payload.sale_price_start_date;
  if (dto.sale_price_end_date == null) delete payload.sale_price_end_date;
  return payload;
}
