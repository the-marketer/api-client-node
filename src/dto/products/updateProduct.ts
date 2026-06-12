import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';

export const updateProductSchema = z.object({
  id: z.string().min(1), sku: z.string().min(1),
  name: z.string().optional().nullable(), description: z.string().optional().nullable(),
  url: z.string().optional().nullable(), main_image: z.string().optional().nullable(),
  category: z.string().optional().nullable(), brand: z.string().optional().nullable(),
  acquisition_price: z.number().optional().nullable(), price: z.number().optional().nullable(),
  sale_price: z.string().optional().nullable(), availability: z.number().int().optional().nullable(),
  stock: z.number().int().optional().nullable(),
  media_gallery: z.array(z.string().min(1)).max(2).optional().nullable(),
  created_at: z.string().optional().nullable(),
  extra_attributes: z.record(z.string()).optional().nullable(),
  sale_price_start_date: z.string().optional().nullable(),
  sale_price_end_date: z.string().optional().nullable(),
});

export type UpdateProduct = z.infer<typeof updateProductSchema>;
export const parseUpdateProduct = (d: unknown) => validateAndCreate(updateProductSchema, d);
export const updateProductToApiPayload = (dto: UpdateProduct) => defaultToApiPayload(dto);
