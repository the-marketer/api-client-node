import { describe, expect, it } from 'vitest';
import { ApiContext } from '../../src/common/apiContext';
import { ApiGateway } from '../../src/gateways/apiGateway';
import { TrackingGateway } from '../../src/gateways/trackingGateway';
import {
  createConfig,
  createMockFetch,
  MOCK_API_KEY,
  MOCK_BASE_URL,
  MOCK_DOMAIN,
  MOCK_TRACKING_KEY,
} from '../testCase';

describe('ApiContext', () => {
  it('returns the same rest gateway instance on repeated access', () => {
    const config = createConfig({
      customerId: MOCK_DOMAIN,
      restKey: MOCK_API_KEY,
      restUrl: MOCK_BASE_URL,
    });
    const ctx = new ApiContext(config, 1);

    expect(ctx.rest).toBe(ctx.rest);
  });

  it('returns the same tracking gateway instance on repeated access', () => {
    const config = createConfig({
      customerId: MOCK_DOMAIN,
      restKey: MOCK_API_KEY,
      restUrl: MOCK_BASE_URL,
      trackingUrl: MOCK_BASE_URL,
      trackingKey: MOCK_TRACKING_KEY,
    });
    const ctx = new ApiContext(config, 1);

    expect(ctx.tracking).toBe(ctx.tracking);
  });

  it('throws when accessing an unknown gateway name', () => {
    const config = createConfig({
      customerId: MOCK_DOMAIN,
      restKey: MOCK_API_KEY,
      restUrl: MOCK_BASE_URL,
    });
    const ctx = new ApiContext(config, 1);

    expect(() => (ctx as unknown as Record<string, unknown>).not_a_gateway).toThrow(
      'Unknown gateway:',
    );
  });

  it('tracking getter returns a TrackingGateway', () => {
    const config = createConfig({
      customerId: MOCK_DOMAIN,
      restKey: MOCK_API_KEY,
      restUrl: MOCK_BASE_URL,
      trackingUrl: MOCK_BASE_URL,
      trackingKey: MOCK_TRACKING_KEY,
    });
    const ctx = new ApiContext(config, 1);

    expect(ctx.tracking).toBeInstanceOf(TrackingGateway);
  });

  it('returns a pre-injected rest gateway from property access', () => {
    const config = createConfig({
      customerId: MOCK_DOMAIN,
      restKey: MOCK_API_KEY,
      restUrl: MOCK_BASE_URL,
    });
    const { fetchFn } = createMockFetch([{ status: 200, body: '{}' }]);
    const rest = new ApiGateway(config, 0, fetchFn);
    const ctx = new ApiContext(config, 0, undefined, { rest });

    expect(ctx.rest).toBe(rest);
  });
});
