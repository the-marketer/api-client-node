import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const productReviewsSchema = z.object({
  t: z.number().int().positive().optional().nullable(),
  page: z.number().int().positive().optional().nullable(),
  perPage: z.number().int().positive().optional().nullable(),
});

export type ProductReviews = z.infer<typeof productReviewsSchema>;

export function parseProductReviews(data: unknown): ProductReviews {
  const raw = { ...(data as Record<string, unknown>) };
  for (const key of ['t', 'page', 'perPage'] as const) {
    if (typeof raw[key] === 'string' && raw[key] !== '' && !Number.isNaN(Number(raw[key]))) {
      raw[key] = parseInt(raw[key] as string, 10);
    }
  }
  return validateAndCreate(productReviewsSchema, raw);
}

export const productReviewsToApiPayload = (dto: ProductReviews) =>
  filterNonEmpty({ t: dto.t, page: dto.page, perPage: dto.perPage }) as Record<string, unknown>;
