import { createReportSchema } from './reportSchema';
import { emailReportTypeValues } from '../../enums/emailReportType';
const r = createReportSchema(emailReportTypeValues);
export const emailReportsSchema = r.schema;
export type EmailReports = import('zod').infer<typeof r.schema>;
export const parseEmailReports = r.parse;
export const emailReportsToApiPayload = r.toApiPayload;
