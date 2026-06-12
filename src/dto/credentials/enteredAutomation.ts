import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const enteredAutomationSchema = z.object({
  date: z.string().min(1),
  page: z.number().int().positive().optional().nullable(),
  perPage: z.number().int().min(1).max(100).optional().nullable(),
});
export type EnteredAutomation = z.infer<typeof enteredAutomationSchema>;
export const parseEnteredAutomation = (d: unknown) => validateAndCreate(enteredAutomationSchema, d);
export const enteredAutomationToApiPayload = (dto: EnteredAutomation) => defaultToApiPayload(dto);
