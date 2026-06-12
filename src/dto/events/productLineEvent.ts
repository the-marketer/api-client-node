import { z } from 'zod';
import { coerceNumericStrings, validateAndCreate } from '../../common/payload';
import { trackingEventToApiPayload } from '../helpers';
import { parseProductLineVariation, productLineVariationSchema } from './productLineVariation';

export const productLineEventSchema = z.object({
  did: z.string().min(1), event: z.string().min(1),
  product_id: z.number().int().positive(), quantity: z.number().int().positive(),
  variation: productLineVariationSchema,
  http_user_agent: z.string().min(1), url: z.string().url(), remote_addr: z.string().min(1),
  source: z.string().optional().nullable(),
});

export type ProductLineEvent = z.infer<typeof productLineEventSchema>;

export function parseProductLineEvent(data: unknown): ProductLineEvent {
  let raw = coerceNumericStrings(data as Record<string, unknown>, ['product_id', 'quantity'], []);
  const variation = parseProductLineVariation((raw as Record<string, unknown>).variation);
  return validateAndCreate(productLineEventSchema, { ...raw, variation });
}

export function productLineEventToApiPayload(dto: ProductLineEvent): Record<string, unknown> {
  return trackingEventToApiPayload({
    did: dto.did, event: dto.event, product_id: dto.product_id, quantity: dto.quantity,
    variation: dto.variation, http_user_agent: dto.http_user_agent, url: dto.url, remote_addr: dto.remote_addr,
  }, dto.source);
}
