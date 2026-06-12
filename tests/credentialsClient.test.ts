import { describe, expect, it } from 'vitest';
import { CredentialsClient } from '../src/api/credentialsClient';
import { MOCK_API_KEY, MOCK_DOMAIN, createApiWithMock, lastRequest } from './testCase';

describe('CredentialsClient', () => {
  it('checkCredentials posts k/r/u to check-credentials', async () => {
    const [api, bucket] = createApiWithMock(CredentialsClient, [
      { status: 200, body: '[]' },
    ]);

    await api.checkCredentials('track-123');

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/check-credentials$/);
    expect(JSON.parse(await req.text())).toMatchObject({
      k: 'track-123',
      r: MOCK_API_KEY,
      u: MOCK_DOMAIN,
    });
  });

  it('checkApiCredentials posts to check-api-credentials', async () => {
    const [api, bucket] = createApiWithMock(CredentialsClient, [
      { status: 200, body: '[]' },
    ]);

    await api.checkApiCredentials();

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/check-api-credentials$/);
  });

  it('getCosts GETs get_costs', async () => {
    const [api, bucket] = createApiWithMock(CredentialsClient, [
      { status: 200, body: '{}' },
    ]);
    await api.getCosts();
    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/get_costs$/);
  });

  it('getRealtimeVisitors GETs realtime_visitors', async () => {
    const [api, bucket] = createApiWithMock(CredentialsClient, [
      { status: 200, body: '{}' },
    ]);
    await api.getRealtimeVisitors();
    expect(new URL(lastRequest(bucket).url).pathname).toMatch(/\/realtime_visitors$/);
  });

  it('getSmsCredit GETs check-sms-credit', async () => {
    const [api, bucket] = createApiWithMock(CredentialsClient, [
      { status: 200, body: '{}' },
    ]);
    await api.getSmsCredit();
    expect(new URL(lastRequest(bucket).url).pathname).toMatch(/\/check-sms-credit$/);
  });

  it('getReferralLink returns the raw string body', async () => {
    const [api, bucket] = createApiWithMock(CredentialsClient, [
      { status: 200, body: 'https://ref.example/abc' },
    ]);

    const result = await api.getReferralLink('john@doe.com');

    expect(result).toBe('https://ref.example/abc');
    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/get-referral-link$/);
    expect(new URL(req.url).searchParams.get('email')).toBe('john@doe.com');
  });

  it('getDeliveryLogs GETs delivery-logs with the email query', async () => {
    const [api, bucket] = createApiWithMock(CredentialsClient, [
      { status: 200, body: '{}' },
    ]);

    await api.getDeliveryLogs({ email: 'john@doe.com', per_page: 20, page: 1 });

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/delivery-logs$/);
    expect(new URL(req.url).searchParams.get('email')).toBe('john@doe.com');
  });

  it('getEnteredAutomation GETs entered-automation with the date query', async () => {
    const [api, bucket] = createApiWithMock(CredentialsClient, [
      { status: 200, body: '{}' },
    ]);

    await api.getEnteredAutomation({ date: '2026-01-31' });

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/entered-automation$/);
    expect(new URL(req.url).searchParams.get('date')).toBe('2026-01-31');
  });
});
