import { describe, expect, it } from 'vitest';
import { CampaignsApi } from '../src/api/campaignsApi';
import { createApiWithMock, lastRequest } from './testCase';

const campaign = {
  type: 'email',
  mode: 'regular',
  sender: { name: 'Shop', sender: 'shop@example.com', reply_to: 'support@example.com' },
  audience: { audience_type: 'all', smart_sending: false },
  subject: { name: 'Spring', subject_line: 'Hello', preview_text: 'Preview' },
  content: { html: '<p>Hi</p>' },
  scheduling: { send_at: '2026-06-01 12:00', use_optimal_time: 0, optimize_for: 'opening' },
  tracking: { utm_campaign: 'spring-2026', utm_medium: 'email', utm_source: 'newsletter' },
};

describe('CampaignsApi', () => {
  it('list posts to campaigns/list', async () => {
    const [api, bucket] = createApiWithMock(CampaignsApi, [{ status: 200, body: '[]' }]);

    await api.list({ search: 'spring', type: 'email' });

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/campaigns\/list$/);
    expect(JSON.parse(await req.text())).toMatchObject({ search: 'spring', type: 'email' });
  });

  it('create posts the campaign payload to campaigns/create', async () => {
    const [api, bucket] = createApiWithMock(CampaignsApi, [{ status: 200, body: '{}' }]);

    await api.create(campaign);

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/campaigns\/create$/);
    expect(JSON.parse(await req.text())).toMatchObject({ type: 'email', mode: 'regular' });
  });

  it('getEmailReport GETs the campaign email report path', async () => {
    const [api, bucket] = createApiWithMock(CampaignsApi, [{ status: 200, body: '{}' }]);

    await api.getEmailReport('99');

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/campaigns\/99\/email\/get-report$/);
  });

  it('getLatestCampaign sends GET with limit query (positional arg)', async () => {
    const [api, bucket] = createApiWithMock(CampaignsApi, [{ status: 200, body: '[]' }]);

    await api.getLatestCampaign(5);

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/get-latest-campaign$/);
    expect(new URL(req.url).searchParams.get('limit')).toBe('5');
  });

  it('getLatestCampaign omits limit when not provided', async () => {
    const [api, bucket] = createApiWithMock(CampaignsApi, [{ status: 200, body: '[]' }]);

    await api.getLatestCampaign();

    expect(new URL(lastRequest(bucket).url).searchParams.has('limit')).toBe(false);
  });
});
