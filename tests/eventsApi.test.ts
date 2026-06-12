import { describe, expect, it } from 'vitest';
import { EventsApi } from '../src/api/eventsApi';
import {
  MOCK_API_KEY,
  MOCK_TRACKING_KEY,
  createApiWithMock,
  lastRequest,
} from './testCase';

const base = {
  did: 'device-abc',
  url: 'https://shop.example.com/',
  http_user_agent: 'Mozilla/5.0',
  remote_addr: '203.0.113.10',
};

const line = {
  did: 'device-abc',
  product_id: 100,
  quantity: 1,
  variation: { id: 'var-1', sku: 'SKU-1' },
  url: 'https://shop.example.com/p/100',
  http_user_agent: 'Mozilla/5.0',
  remote_addr: '203.0.113.10',
};

function pathOf(bucket: ReturnType<typeof createApiWithMock>[1]): string {
  return new URL(lastRequest(bucket).url).pathname;
}

describe('EventsApi', () => {
  it('sendCustomApi posts to the REST custom_events endpoint', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);

    await api.sendCustomApi({ email: 'user@example.com', event: 'newsletter_click' });

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/custom_events$/);
    // REST gateway auth
    expect(new URL(req.url).searchParams.get('k')).toBe(MOCK_API_KEY);
  });

  it('sendCustom posts to the tracking endpoint with tracking auth', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);

    await api.sendCustom({
      ...base,
      email: 'user@example.com',
      event: 'product_viewed',
    });

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toBe('/t/r');
    // tracking gateway auth: k = tracking key, api_key = rest key
    expect(new URL(req.url).searchParams.get('k')).toBe(MOCK_TRACKING_KEY);
    expect(new URL(req.url).searchParams.get('api_key')).toBe(MOCK_API_KEY);
  });

  it('viewHomepage posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.viewHomepage({ ...base, event: 'view_homepage' });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('setEmail posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.setEmail({
      ...base,
      event: 'set_email',
      email_address: 'user@example.com',
      firstname: 'John',
      lastname: 'Doe',
      phone: '+40123456789',
    });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('viewProduct posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.viewProduct({ ...base, event: 'view_product', product_id: '42' });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('addToCart posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.addToCart({ ...line, event: 'add_to_cart' });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('removeFromCart posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.removeFromCart({ ...line, event: 'remove_from_cart' });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('addToWishlist posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.addToWishlist({ ...line, event: 'add_to_wishlist' });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('removeFromWishlist posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.removeFromWishlist({ ...line, event: 'remove_from_wishlist' });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('initiateCheckout posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.initiateCheckout({ ...base, event: 'initiate_checkout' });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('search posts to /t/r', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.search({ ...base, event: 'search', search_term: 'running shoes' });
    expect(pathOf(bucket)).toBe('/t/r');
  });

  it('serveJavascript GETs the tracking JS path for the key', async () => {
    const [api, bucket] = createApiWithMock(EventsApi, [{ status: 200, body: '{}' }]);
    await api.serveJavascript('abcdef123456');
    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toBe('/t/j/abcdef123456');
  });
});
