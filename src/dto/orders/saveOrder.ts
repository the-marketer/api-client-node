import { z } from 'zod';
import { coerceNumericStrings, trimStringFields, validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
import { parseSaveOrderProductLine, saveOrderProductLineSchema } from './saveOrderProductLine';

export const saveOrderSchema = z.object({
  number: z.number().int().positive(), email_address: z.string().min(1).email(),
  phone: z.string().min(1), firstname: z.string().min(1), lastname: z.string().min(1),
  city: z.string().min(1), county: z.string().min(1), address: z.string().min(1),
  discount_value: z.number().nonnegative(), discount_code: z.string().min(1),
  shipping: z.number().nonnegative(), tax: z.number().nonnegative(), total_value: z.number().nonnegative(),
  products: z.array(saveOrderProductLineSchema).min(1),
});

export type SaveOrder = z.infer<typeof saveOrderSchema>;

export function parseSaveOrder(data: unknown): SaveOrder {
  let raw = trimStringFields(data as Record<string, unknown>, ['email_address']);
  raw = coerceNumericStrings(raw, ['number'], ['discount_value', 'shipping', 'tax', 'total_value']);
  const products = (Array.isArray(raw.products) ? raw.products : []).map((p) => parseSaveOrderProductLine(p));
  return validateAndCreate(saveOrderSchema, { ...raw, products });
}

export function saveOrderToApiPayload(dto: SaveOrder): Record<string, unknown> {
  return { ...defaultToApiPayload(dto), products: dto.products.map((p) => ({ ...p })) };
}
