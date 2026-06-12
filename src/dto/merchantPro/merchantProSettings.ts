import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const merchantProSettingsSchema = z.object({
  product_feed_url: z.string().optional().nullable(),
  inventory_feed_url: z.string().optional().nullable(),
  order_feed_url: z.string().optional().nullable(),
  api_key: z.string().optional().nullable(),
  api_password: z.string().optional().nullable(),
});

export type MerchantProSettings = z.infer<typeof merchantProSettingsSchema>;

export function parseMerchantProSettings(data: unknown): MerchantProSettings {
  const raw = { ...(data as Record<string, unknown>) };
  for (const key of Object.keys(raw)) {
    if (typeof raw[key] === 'string') {
      const v = (raw[key] as string).trim();
      raw[key] = v === '' ? null : v;
    }
  }
  return validateAndCreate(merchantProSettingsSchema, raw);
}

export function merchantProSettingsToApiPayload(dto: MerchantProSettings): Record<string, unknown> {
  return filterNonEmpty({
    product_feed_url: dto.product_feed_url?.trim() ?? null,
    inventory_feed_url: dto.inventory_feed_url?.trim() ?? null,
    order_feed_url: dto.order_feed_url?.trim() ?? null,
    api_key: dto.api_key?.trim() ?? null,
    api_password: dto.api_password?.trim() ?? null,
  }) as Record<string, unknown>;
}
