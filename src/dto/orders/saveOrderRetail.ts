import { z } from 'zod';
import { coerceNumericStrings, trimStringFields, validateAndCreate } from '../../common/payload';
import { parseSaveOrderProductLine, saveOrderProductLineSchema } from './saveOrderProductLine';
import { saveOrderToApiPayload, type SaveOrder } from './saveOrder';

export const saveOrderRetailSchema = z.object({
  number: z.number().int().positive(), email_address: z.string().min(1).email(),
  phone: z.string().min(1), firstname: z.string().min(1), lastname: z.string().min(1),
  city: z.string().min(1), county: z.string().min(1), address: z.string().min(1),
  discount_value: z.number().nonnegative(), discount_code: z.string().min(1),
  shipping: z.number().nonnegative(), tax: z.number().nonnegative(), total_value: z.number().nonnegative(),
  products: z.array(saveOrderProductLineSchema).min(1),
  store_id: z.number().int().positive(), store_name: z.string().min(1),
  store_city: z.string().min(1), store_country: z.string().min(1),
});

export type SaveOrderRetail = z.infer<typeof saveOrderRetailSchema>;

export function parseSaveOrderRetail(data: unknown): SaveOrderRetail {
  let raw = trimStringFields(data as Record<string, unknown>, ['email_address']);
  raw = coerceNumericStrings(raw, ['number', 'store_id'], ['discount_value', 'shipping', 'tax', 'total_value']);
  const products = (Array.isArray(raw.products) ? raw.products : []).map((p) => parseSaveOrderProductLine(p));
  return validateAndCreate(saveOrderRetailSchema, { ...raw, products });
}

export function saveOrderRetailToApiPayload(dto: SaveOrderRetail): Record<string, unknown> {
  return {
    ...saveOrderToApiPayload(dto),
    store_id: dto.store_id,
    store_name: dto.store_name,
    store_city: dto.store_city,
    store_country: dto.store_country,
  };
}
