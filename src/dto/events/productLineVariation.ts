import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const productLineVariationSchema = z.object({ id: z.string().min(1), sku: z.string().min(1) });
export type ProductLineVariation = z.infer<typeof productLineVariationSchema>;
export const parseProductLineVariation = (d: unknown) => validateAndCreate(productLineVariationSchema, d);
export const productLineVariationToApiPayload = (dto: ProductLineVariation) => defaultToApiPayload(dto);
