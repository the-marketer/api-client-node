import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const merchantAddReviewSchema = z.object({
  email: z.string().min(1).email(),
  product_id: z.union([z.string().min(1), z.number()]),
  name: z.string().optional().nullable(), date_created: z.string().optional().nullable(),
  rating: z.number().int().nonnegative().optional().nullable(), content: z.string().optional().nullable(),
});

export type MerchantAddReview = z.infer<typeof merchantAddReviewSchema>;

export function parseMerchantAddReview(data: unknown): MerchantAddReview {
  const raw = { ...(data as Record<string, unknown>) };
  if (typeof raw.email === 'string') raw.email = raw.email.trim();
  if (typeof raw.rating === 'string' && raw.rating !== '' && !Number.isNaN(Number(raw.rating))) {
    raw.rating = parseInt(raw.rating as string, 10);
  }
  return validateAndCreate(merchantAddReviewSchema, raw);
}

export function merchantAddReviewToApiPayload(dto: MerchantAddReview): Record<string, unknown> {
  const filtered = filterNonEmpty({
    email: dto.email.toLowerCase().trim(),
    product_id: String(dto.product_id),
    name: dto.name, date_created: dto.date_created, rating: dto.rating, content: dto.content,
  });
  return filtered as Record<string, unknown>;
}
