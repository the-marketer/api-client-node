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

  it('getInfo sends phone query when no email', async () => {
    const [api, bucket] = createApiWithMock(LoyaltyApi, [
      { status: 200, body: '{}' },
    ]);

    await api.getInfo(null, '0735111411');

    const params = new URL(lastRequest(bucket).url).searchParams;
    expect(params.get('phone')).toBe('0735111411');
    expect(params.has('email')).toBe(false);
  });

  it('getInfo rejects when email and phone are missing', async () => {
    const [api] = createApiWithMock(LoyaltyApi, []);

    await expect(api.getInfo()).rejects.toThrow('Either email or phone is required.');
  });

  it('managePoints posts phone when no email', async () => {
    const [api, bucket] = createApiWithMock(LoyaltyApi, [
      { status: 200, body: '{}' },
    ]);

    await api.managePoints(null, 'decrease', 5, '0735111411');

    const body = JSON.parse(await lastRequest(bucket).text());
    expect(body).toEqual({ phone: '0735111411', action: 'decrease', points: 5 });
  });

  it('managePoints rejects when email and phone are missing', async () => {
    const [api] = createApiWithMock(LoyaltyApi, []);

    await expect(api.managePoints(null, 'increase', 5)).rejects.toThrow('Either email or phone is required.');
  });
});
