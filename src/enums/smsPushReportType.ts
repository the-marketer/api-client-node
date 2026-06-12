export const smsPushReportTypeValues = [
  'sent',
  'click-rate',
  'unique-click-rate',
  'clicks',
  'unique-clicks',
  'transactions',
  'revenue',
  'conversion-rate',
  'average-order-value',
  'unsubscribed',
  'unsubscribed-rate',
] as const;

export type SmsPushReportType = (typeof smsPushReportTypeValues)[number];
