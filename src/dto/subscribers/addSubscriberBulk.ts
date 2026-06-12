import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import {
  parseSubscriberValidator,
  subscriberValidatorSchema,
  subscriberValidatorToApiPayload,
} from './subscriberValidator';

export const addSubscriberBulkSchema = z.object({
  subscribers: z.array(subscriberValidatorSchema).min(1),
});

export type AddSubscriberBulk = z.infer<typeof addSubscriberBulkSchema>;

export function parseAddSubscriberBulk(data: unknown): AddSubscriberBulk {
  const raw = data as Record<string, unknown>;
  const subscribers = (Array.isArray(raw.subscribers) ? raw.subscribers : []).map((item) =>
    parseSubscriberValidator(item),
  );
  return validateAndCreate(addSubscriberBulkSchema, { subscribers });
}

export function addSubscriberBulkToApiPayload(dto: AddSubscriberBulk): unknown[] {
  return dto.subscribers.map((row) => subscriberValidatorToApiPayload(row));
}
