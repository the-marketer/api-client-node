export const formsReportTypeValues = [
  'total-impressions',
  'total-subscribed-users',
  'total-subscribe-rate',
  'impressions',
  'subscribed-users',
  'subscribe-rate',
] as const;

export type FormsReportType = (typeof formsReportTypeValues)[number];
