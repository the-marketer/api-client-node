import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const addSubscriberByPhoneSchema = z.object({
  phone: z.string().min(1),
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable(),
});

export type AddSubscriberByPhone = z.infer<typeof addSubscriberByPhoneSchema>;

export function parseAddSubscriberByPhone(data: unknown): AddSubscriberByPhone {
  return validateAndCreate(addSubscriberByPhoneSchema, data);
}

export function addSubscriberByPhoneToApiPayload(dto: AddSubscriberByPhone): Record<string, unknown> {
  return { phone: dto.phone, ...filterNonEmpty({ firstname: dto.firstname, lastname: dto.lastname }) };
}
