import { createReportSchema } from './reportSchema';
import { formsReportTypeValues } from '../../enums/formsReportType';
const r = createReportSchema(formsReportTypeValues);
export const formsReportsSchema = r.schema;
export type FormsReports = import('zod').infer<typeof r.schema>;
export const parseFormsReports = r.parse;
export const formsReportsToApiPayload = r.toApiPayload;
