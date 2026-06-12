export const audienceReportTypeValues = [
  'total-subscribed-emails',
  'total-subscribed-sms',
  'total-subscribed-push',
  'total-subscribed-loyalty',
  'total-unsubscribed-emails',
  'total-unsubscribed-sms',
  'total-unsubscribed-push',
  'total-unsubscribed-loyalty',
  'total-active-emails',
  'total-inactive-emails',
  'total-cleaned-emails',
  'total-bounced-emails',
  'subscribed-emails',
  'subscribed-sms',
  'subscribed-push',
  'subscribed-loyalty',
] as const;

export type AudienceReportType = (typeof audienceReportTypeValues)[number];
