import { describe, expect, it } from 'vitest';
import { ReportsApi } from '../src/api/reportsApi';
import { createApiWithMock, lastRequest } from './testCase';

const range = { start: '2026-01-01', end: '2026-01-31' };

const cases: Array<{ method: keyof ReportsApi; path: string; type: string }> = [
  { method: 'getEmailCampaigns', path: '/reports/get-email-campaigns', type: 'sent' },
  { method: 'getEmailAutomation', path: '/reports/get-email-automation', type: 'sent' },
  { method: 'getPushCampaigns', path: '/reports/get-push-campaigns', type: 'sent' },
  { method: 'getPushAutomation', path: '/reports/get-push-automation', type: 'sent' },
  { method: 'getSmsCampaigns', path: '/reports/get-sms-campaigns', type: 'sent' },
  { method: 'getSmsAutomation', path: '/reports/get-sms-automation', type: 'sent' },
  { method: 'getFormsPopups', path: '/reports/get-forms-popups', type: 'impressions' },
  { method: 'getFormsEmbedded', path: '/reports/get-forms-embedded', type: 'impressions' },
  { method: 'getAudience', path: '/reports/get-audience', type: 'total-subscribed-emails' },
];

describe('ReportsApi', () => {
  for (const { method, path, type } of cases) {
    it(`${method} GETs ${path} with type/start/end query`, async () => {
      const [api, bucket] = createApiWithMock(ReportsApi, [
        { status: 200, body: '{}' },
      ]);

      const fn = api[method] as (p: Record<string, unknown>) => Promise<unknown>;
      await fn.call(api, { type, ...range });

      const req = lastRequest(bucket);
      expect(req.method).toBe('GET');
      expect(new URL(req.url).pathname.endsWith(path)).toBe(true);

      const q = new URL(req.url).searchParams;
      expect(q.get('type')).toBe(type);
      expect(q.get('start')).toBe(range.start);
      expect(q.get('end')).toBe(range.end);
    });
  }
});
