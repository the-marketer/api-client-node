import { describe, expect, it } from 'vitest';
import { LoyaltyApi } from '../src/api/loyaltyApi';
import { createApiWithMock, lastRequest } from './testCase';

describe('LoyaltyApi', () => {
  it('getInfo sends GET with email query', async () => {
    const [api, bucket] = createApiWithMock(LoyaltyApi, [
      { status: 200, body: '{}' },
    ]);

    await api.getInfo('john@doe.com');

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/loyalty_info$/);
    expect(new URL(req.url).searchParams.get('email')).toBe('john@doe.com');
  });

  it('managePoints posts email, action and points', async () => {
    const [api, bucket] = createApiWithMock(LoyaltyApi, [
      { status: 200, body: '{}' },
    ]);

    await api.managePoints('john@doe.com', 'increase', 100);

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/manage_loyalty_points$/);
    expect(JSON.parse(await req.text())).toMatchObject({
      email: 'john@doe.com',
      action: 'increase',
      points: 100,
    });
  });
});
