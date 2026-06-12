import { describe, expect, it } from 'vitest';
import {
  ApiException,
  CustomerNotFoundException,
  MethodNotAllowedException,
  UnauthorizedException,
} from '../../src/exceptions';
import { ApiGateway } from '../../src/gateways/apiGateway';
import { TrackingGateway } from '../../src/gateways/trackingGateway';
import { createConfig, createMockFetch } from '../testCase';

describe('gateway HTTP requests', () => {
  it('ApiGateway builds REST URL and auth query', async () => {
    const { fetchFn, getLastRequest } = createMockFetch([{ status: 200, body: '{}' }]);
    const config = createConfig({
      restUrl: 'https://api.example.test',
      apiVersion: 'v2',
    });
    const gw = new ApiGateway(config, 0, fetchFn);

    await gw.get('subscribers/status', { extra: '1' });

    const req = getLastRequest();
    expect(req).not.toBeNull();
    const url = new URL(req!.url);
    expect(url.origin + url.pathname).toBe('https://api.example.test/api/v2/subscribers/status');
    expect(url.searchParams.get('k')).toBe('api-secret');
    expect(url.searchParams.get('u')).toBe('domain-1');
    expect(url.searchParams.get('extra')).toBe('1');
    expect(req!.method).toBe('GET');
    expect(req!.headers.get('User-Agent')).toBe('TheMarketer API Client');
  });

  it('TrackingGateway builds tracking URL and auth query', async () => {
    const { fetchFn, getLastRequest } = createMockFetch([{ status: 200, body: '{}' }]);
    const config = createConfig({
      trackingUrl: 'https://track.example.test/',
      trackingKey: 'track-key-123456789012',
      restKey: 'rest-secret',
    });
    const gw = new TrackingGateway(config, 0, fetchFn);

    await gw.post('events/view');

    const url = new URL(getLastRequest()!.url);
    expect(url.origin + url.pathname).toBe('https://track.example.test/events/view');
    expect(url.searchParams.get('k')).toBe('track-key-123456789012');
    expect(url.searchParams.get('api_key')).toBe('rest-secret');
    expect(getLastRequest()!.method).toBe('POST');
  });

  it('ApiGateway post sends JSON body', async () => {
    const { fetchFn, getLastRequest } = createMockFetch([{ status: 200, body: '{}' }]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await gw.post('orders', { order_id: '42' });

    expect(getLastRequest()!.method).toBe('POST');
    expect(await getLastRequest()!.text()).toBe(JSON.stringify({ order_id: '42' }));
  });

  it('ApiGateway returns empty array for empty JSON body', async () => {
    const { fetchFn } = createMockFetch([{ status: 200, body: '' }]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await expect(gw.get('x')).resolves.toEqual([]);
  });

  it('ApiGateway json false returns raw string body', async () => {
    const { fetchFn } = createMockFetch([{ status: 200, body: 'plain-text' }]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await expect(gw.get('export', {}, false)).resolves.toBe('plain-text');
  });

  it('maps 401 to UnauthorizedException with JSON message', async () => {
    const { fetchFn } = createMockFetch([
      { status: 401, body: JSON.stringify({ message: 'Invalid key' }) },
    ]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await expect(gw.get('x')).rejects.toSatisfy((err: unknown) => {
      expect(err).toBeInstanceOf(UnauthorizedException);
      expect((err as UnauthorizedException).message).toBe('Invalid key');
      return true;
    });
  });

  it('maps 404 to CustomerNotFoundException', async () => {
    const { fetchFn } = createMockFetch([
      { status: 404, body: JSON.stringify({ message: 'No subscriber' }) },
    ]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await expect(gw.get('x')).rejects.toMatchObject({
      name: 'CustomerNotFoundException',
      message: 'No subscriber',
    });
  });

  it('maps 405 to MethodNotAllowedException', async () => {
    const { fetchFn } = createMockFetch([{ status: 405, body: '{}' }]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await expect(gw.get('x')).rejects.toBeInstanceOf(MethodNotAllowedException);
  });

  it('maps other errors to ApiException with status', async () => {
    const { fetchFn } = createMockFetch([
      { status: 422, body: JSON.stringify({ message: 'Validation failed' }) },
    ]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await expect(gw.get('x')).rejects.toSatisfy((err: unknown) => {
      expect(err).toBeInstanceOf(ApiException);
      expect((err as ApiException).code).toBe(422);
      expect((err as ApiException).message).toBe('Validation failed');
      return true;
    });
  });

  it('extractErrorMessage truncates long non-JSON bodies', async () => {
    const longBody = 'x'.repeat(600);
    const { fetchFn } = createMockFetch([{ status: 500, body: longBody }]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await expect(gw.get('x')).rejects.toMatchObject({
      message: `${'x'.repeat(500)}…`,
      code: 500,
    });
  });

  it('extractErrorMessage uses Request failed for empty error body', async () => {
    const { fetchFn } = createMockFetch([{ status: 500, body: '' }]);
    const gw = new ApiGateway(createConfig(), 0, fetchFn);

    await expect(gw.get('x')).rejects.toMatchObject({
      message: 'Request failed',
      code: 500,
    });
  });
});
