import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const addReviewSchema = z.object({
  order_id: z.string().min(1), review_date: z.string().min(1),
  order_rating: z.string().optional().nullable(), order_review: z.string().optional().nullable(),
  product_rating: z.array(z.unknown()).optional().nullable(),
  product_review: z.array(z.unknown()).optional().nullable(),
  media_files: z.array(z.unknown()).optional().nullable(),
});
export type AddReview = z.infer<typeof addReviewSchema>;
export const parseAddReview = (d: unknown) => validateAndCreate(addReviewSchema, d);
export const addReviewToApiPayload = (dto: AddReview) => defaultToApiPayload(dto);
