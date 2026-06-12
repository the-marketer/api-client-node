import { describe, expect, it } from 'vitest';
import { MobilePushApi } from '../src/api/mobilePushApi';
import { createApiWithMock, lastRequest } from './testCase';

describe('MobilePushApi', () => {
  it('setToken posts email, token and type (positional args, like PHP)', async () => {
    const [api, bucket] = createApiWithMock(MobilePushApi, [
      { status: 200, body: '{}' },
    ]);

    await api.setToken('user@example.com', 'device-token-1', 'ios');

    const request = lastRequest(bucket);
    expect(request.method).toBe('POST');
    expect(new URL(request.url).pathname).toMatch(
      /\/app-push-notifications\/token\/set$/,
    );
    expect(JSON.parse(await request.text())).toEqual({
      email: 'user@example.com',
      token: 'device-token-1',
      type: 'ios',
    });
  });

  it('removeToken posts email and type', async () => {
    const [api, bucket] = createApiWithMock(MobilePushApi, [
      { status: 200, body: '{}' },
    ]);

    await api.removeToken('user@example.com', 'android');

    const request = lastRequest(bucket);
    expect(request.method).toBe('POST');
    expect(new URL(request.url).pathname).toMatch(
      /\/app-push-notifications\/token\/remove$/,
    );
    expect(JSON.parse(await request.text())).toEqual({
      email: 'user@example.com',
      type: 'android',
    });
  });
});
