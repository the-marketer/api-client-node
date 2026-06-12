import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const checkCredentialsSchema = z.object({ k: z.string().min(1), r: z.string().min(1), u: z.string().min(1) });
export type CheckCredentials = z.infer<typeof checkCredentialsSchema>;
export const parseCheckCredentials = (d: unknown) => validateAndCreate(checkCredentialsSchema, d);
export const checkCredentialsToApiPayload = (dto: CheckCredentials) => defaultToApiPayload(dto);
