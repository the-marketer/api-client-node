import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
export const deliveryLogsSchema = z.object({
  email: z.string().min(1).email(),
  per_page: z.number().int().min(1).max(100).optional().nullable(),
  page: z.number().int().positive().optional().nullable(),
  start: z.string().optional().nullable(),
  end: z.string().optional().nullable(),
});
export type DeliveryLogs = z.infer<typeof deliveryLogsSchema>;
export const parseDeliveryLogs = (d: unknown) => validateAndCreate(deliveryLogsSchema, d);
export function deliveryLogsToApiPayload(dto: DeliveryLogs): Record<string, unknown> {
  const q: Record<string, unknown> = { email: dto.email };
  if (dto.per_page != null) q.per_page = dto.per_page;
  if (dto.page != null) q.page = dto.page;
  if (dto.start != null) q.start = dto.start;
  if (dto.end != null) q.end = dto.end;
  return q;
}
