import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export function createReportSchema<T extends readonly [string, ...string[]]>(
  typeValues: T,
) {
  const schema = z.object({
    type: z.enum(typeValues),
    start: z.string().min(1),
    end: z.string().min(1),
    previous_start: z.string().optional(),
    previous_end: z.string().optional(),
  });

  type ReportDto = z.infer<typeof schema>;

  function parse(data: unknown): ReportDto {
    return validateAndCreate(schema, data);
  }

  function toApiPayload(dto: ReportDto): Record<string, unknown> {
    return filterNonEmpty({
      type: dto.type,
      start: dto.start.trim(),
      end: dto.end.trim(),
      previous_start: dto.previous_start?.trim() ?? null,
      previous_end: dto.previous_end?.trim() ?? null,
    }) as Record<string, unknown>;
  }

  return { schema, parse, toApiPayload };
}
