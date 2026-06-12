import { createReportSchema } from './reportSchema';
import { smsPushReportTypeValues } from '../../enums/smsPushReportType';
const r = createReportSchema(smsPushReportTypeValues);
export const pushReportsSchema = r.schema;
export type PushReports = import('zod').infer<typeof r.schema>;
export const parsePushReports = r.parse;
export const pushReportsToApiPayload = r.toApiPayload;
