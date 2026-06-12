import { describe, expect, it } from 'vitest';
import { ReviewsApi } from '../src/api/reviewsApi';
import { createApiWithMock, lastRequest } from './testCase';

describe('ReviewsApi', () => {
  it('getProductReviews returns the raw string body via GET', async () => {
    const [api, bucket] = createApiWithMock(ReviewsApi, [
      { status: 200, body: '<reviews/>' },
    ]);

    const result = await api.getProductReviews({ page: 1, perPage: 20 });

    expect(result).toBe('<reviews/>');
    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/product_reviews$/);
    expect(new URL(req.url).searchParams.get('page')).toBe('1');
  });

  it('createReview posts to add_review', async () => {
    const [api, bucket] = createApiWithMock(ReviewsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.createReview({ order_id: '1001', review_date: '2026-01-01' });

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/add_review$/);
    expect(JSON.parse(await req.text())).toMatchObject({ order_id: '1001' });
  });

  it('merchantAddReview posts to merchant_add_review', async () => {
    const [api, bucket] = createApiWithMock(ReviewsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.merchantAddReview({ email: 'john@doe.com', product_id: 123 });

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/merchant_add_review$/);
    expect(JSON.parse(await req.text())).toMatchObject({ email: 'john@doe.com' });
  });

  it('merchantProSetting posts to merchantpro_settings', async () => {
    const [api, bucket] = createApiWithMock(ReviewsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.merchantProSetting({
      product_feed_url: 'https://shop.example.com/products.xml',
    });

    expect(new URL(lastRequest(bucket).url).pathname).toMatch(/\/merchantpro_settings$/);
  });
});
