export const emailReportTypeValues = [
  'sent',
  'open-rate',
  'unique-open-rate',
  'click-rate',
  'unique-click-rate',
  'opens',
  'unique-opens',
  'clicks',
  'unique-clicks',
  'transactions',
  'revenue',
  'conversion-rate',
  'average-order-value',
  'unsubscribed',
  'complaints',
  'bounced',
  'bounce-rate',
  'complaint-rate',
  'unsubscribe-rate',
] as const;

export type EmailReportType = (typeof emailReportTypeValues)[number];
