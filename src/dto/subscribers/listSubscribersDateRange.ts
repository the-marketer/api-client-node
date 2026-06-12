import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const listSubscribersDateRangeSchema = z.object({
  date_from: z.string().optional().nullable(),
  date_to: z.string().optional().nullable(),
});

export type ListSubscribersDateRange = z.infer<typeof listSubscribersDateRangeSchema>;

export function parseListSubscribersDateRange(data: unknown): ListSubscribersDateRange {
  return validateAndCreate(listSubscribersDateRangeSchema, data);
}

export function listSubscribersDateRangeToApiPayload(
  dto: ListSubscribersDateRange,
): Record<string, unknown> {
  return filterNonEmpty({ date_from: dto.date_from, date_to: dto.date_to }) as Record<string, unknown>;
}
