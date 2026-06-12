import { describe, expect, it } from 'vitest';
import { CouponsApi } from '../src/api/couponsApi';
import { MOCK_API_KEY, MOCK_DOMAIN, createApiWithMock, lastRequest } from './testCase';

describe('CouponsApi', () => {
  it('getAvailableCoupons sends GET with email and auth query', async () => {
    const [api, bucket] = createApiWithMock(CouponsApi, [
      { status: 200, body: '[]' },
    ]);

    await api.getAvailableCoupons('john@doe.com');

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/get_available_coupons$/);

    const q = new URL(req.url).searchParams;
    expect(q.get('email')).toBe('john@doe.com');
    expect(q.get('k')).toBe(MOCK_API_KEY);
    expect(q.get('u')).toBe(MOCK_DOMAIN);
  });

  it('save posts the coupon payload', async () => {
    const [api, bucket] = createApiWithMock(CouponsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.save({
      code: 'WELCOME10',
      type: 'fixed',
      value: '10',
      expiration_date: '2026-12-31',
    });

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/save_coupon$/);
    expect(JSON.parse(await req.text())).toMatchObject({ code: 'WELCOME10', type: 'fixed' });
  });
});
