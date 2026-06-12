import { z } from 'zod';
import { filterNonEmpty, validateAndCreate } from '../../common/payload';

export const subscriberValidatorSchema = z.object({
  email: z.string().min(1).email(),
  add_tags: z.string().optional().nullable(),
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  birthday: z.string().optional().nullable(),
  channels: z.string().optional().nullable(),
  attributes: z.record(z.string()).optional().nullable(),
});

export type SubscriberValidator = z.infer<typeof subscriberValidatorSchema>;

export function parseSubscriberValidator(data: unknown): SubscriberValidator {
  return validateAndCreate(subscriberValidatorSchema, data);
}

export function subscriberValidatorToApiPayload(dto: SubscriberValidator): Record<string, unknown> {
  const body: Record<string, unknown> = {
    email: dto.email.trim(),
    ...filterNonEmpty({
      firstname: dto.firstname,
      lastname: dto.lastname,
      add_tags: dto.add_tags,
      phone: dto.phone,
      city: dto.city,
      country: dto.country,
      birthday: dto.birthday,
      channels: dto.channels,
    }),
  };
  if (dto.attributes != null && Object.keys(dto.attributes).length > 0) {
    body.attributes = dto.attributes;
  }
  return body;
}
