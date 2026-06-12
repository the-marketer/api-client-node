import { createReportSchema } from './reportSchema';
import { audienceReportTypeValues } from '../../enums/audienceReportType';
const r = createReportSchema(audienceReportTypeValues);
export const audienceSchema = r.schema;
export type Audience = import('zod').infer<typeof r.schema>;
export const parseAudience = r.parse;
export const audienceToApiPayload = r.toApiPayload;
