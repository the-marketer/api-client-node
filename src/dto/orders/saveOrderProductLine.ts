import { z } from 'zod';
import { coerceNumericStrings, validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const saveOrderProductLineSchema = z.object({
  product_id: z.number().int().positive(), price: z.number().nonnegative(),
  quantity: z.number().int().positive(), variation_sku: z.string().min(1),
});
export type SaveOrderProductLine = z.infer<typeof saveOrderProductLineSchema>;
export function parseSaveOrderProductLine(data: unknown): SaveOrderProductLine {
  const coerced = coerceNumericStrings(data as Record<string, unknown>, ['product_id', 'quantity'], ['price']);
  return validateAndCreate(saveOrderProductLineSchema, coerced);
}
export const saveOrderProductLineToApiPayload = (dto: SaveOrderProductLine) => defaultToApiPayload(dto);
