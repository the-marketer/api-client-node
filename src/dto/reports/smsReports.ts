import { createReportSchema } from './reportSchema';
import { smsPushReportTypeValues } from '../../enums/smsPushReportType';
const r = createReportSchema(smsPushReportTypeValues);
export const smsReportsSchema = r.schema;
export type SmsReports = import('zod').infer<typeof r.schema>;
export const parseSmsReports = r.parse;
export const smsReportsToApiPayload = r.toApiPayload;
