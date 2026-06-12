import { describe, expect, it } from 'vitest';
import { OrdersApi } from '../src/api/ordersApi';
import { createApiWithMock, lastRequest } from './testCase';

const order = {
  number: 1001,
  email_address: 'john@doe.com',
  phone: '+40123456789',
  firstname: 'John',
  lastname: 'Doe',
  city: 'Bucharest',
  county: 'Bucharest',
  address: 'Street 1, no 2',
  discount_value: 0,
  discount_code: '-',
  shipping: 0,
  tax: 0,
  total_value: 99.99,
  products: [
    { product_id: 123, price: 99.99, quantity: 1, variation_sku: 'SKU-123' },
  ],
};

describe('OrdersApi', () => {
  it('getEcommerceStats GETs get-ecommerce-stats', async () => {
    const [api, bucket] = createApiWithMock(OrdersApi, [{ status: 200, body: '{}' }]);

    await api.getEcommerceStats();

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/get-ecommerce-stats$/);
  });

  it('saveOrder posts the order payload', async () => {
    const [api, bucket] = createApiWithMock(OrdersApi, [{ status: 200, body: '{}' }]);

    await api.saveOrder(order);

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/save_order$/);
    expect(JSON.parse(await req.text())).toMatchObject({ number: 1001 });
  });

  it('saveOrderRetail posts the retail order payload', async () => {
    const [api, bucket] = createApiWithMock(OrdersApi, [{ status: 200, body: '{}' }]);

    await api.saveOrderRetail({
      ...order,
      store_id: 10,
      store_name: 'Store name',
      store_city: 'Bucharest',
      store_country: 'RO',
    });

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/save_order_retail$/);
    expect(JSON.parse(await req.text())).toMatchObject({ store_id: 10 });
  });

  it('updateOrderStatus sends GET with order_number/order_status query', async () => {
    const [api, bucket] = createApiWithMock(OrdersApi, [{ status: 200, body: '{}' }]);

    await api.updateOrderStatus('1001', 'shipped');

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/update_order_status$/);
    const q = new URL(req.url).searchParams;
    expect(q.get('order_number')).toBe('1001');
    expect(q.get('order_status')).toBe('shipped');
  });

  it('updateFeedUrl sends POST with url and type (positional args)', async () => {
    const [api, bucket] = createApiWithMock(OrdersApi, [
      { status: 200, body: '{"ok":true}' },
    ]);

    await api.updateFeedUrl('https://example.com/feed.xml', 'product');

    const request = lastRequest(bucket);
    expect(request.method).toBe('POST');
    expect(new URL(request.url).pathname).toMatch(/\/update_feed_url$/);
    expect(JSON.parse(await request.text())).toEqual({
      url: 'https://example.com/feed.xml',
      type: 'product',
    });
  });

  it('updateFeedUrl omits type when not provided', async () => {
    const [api, bucket] = createApiWithMock(OrdersApi, [{ status: 200, body: '{}' }]);

    await api.updateFeedUrl('https://example.com/feed.xml');

    const request = lastRequest(bucket);
    expect(JSON.parse(await request.text())).toEqual({
      url: 'https://example.com/feed.xml',
    });
  });

  it('updateOrderFeedUrl posts to the order feed endpoint', async () => {
    const [api, bucket] = createApiWithMock(OrdersApi, [{ status: 200, body: '{}' }]);

    await api.updateOrderFeedUrl('https://example.com/orders.xml', 'category');

    const request = lastRequest(bucket);
    expect(request.method).toBe('POST');
    expect(new URL(request.url).pathname).toMatch(/\/update_order_feed_url$/);
    expect(JSON.parse(await request.text())).toEqual({
      url: 'https://example.com/orders.xml',
      type: 'category',
    });
  });
});
