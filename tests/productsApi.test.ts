import { describe, expect, it } from 'vitest';
import { ProductsApi } from '../src/api/productsApi';
import { createApiWithMock, lastRequest } from './testCase';

const product = {
  id: 'P-1',
  sku: 'SKU-1',
  name: 'Tee',
  description: 'A cotton tee',
  url: 'https://shop.example.com/p/1',
  main_image: 'https://shop.example.com/i/1.jpg',
  category: 'Apparel',
  brand: 'Acme',
  acquisition_price: 20,
  price: 49,
  sale_price: '39',
  availability: 1,
  stock: 10,
  media_gallery: [
    'https://shop.example.com/i/1.jpg',
    'https://shop.example.com/i/2.jpg',
  ],
  created_at: '2026-01-01',
};

describe('ProductsApi', () => {
  it('createProduct posts to product/create', async () => {
    const [api, bucket] = createApiWithMock(ProductsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.createProduct(product);

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/product\/create$/);
    expect(JSON.parse(await req.text())).toMatchObject({ id: 'P-1', sku: 'SKU-1' });
  });

  it('updateProduct posts to product/update', async () => {
    const [api, bucket] = createApiWithMock(ProductsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.updateProduct({ id: 'P-1', sku: 'SKU-1', price: 45 });

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/product\/update$/);
    expect(JSON.parse(await req.text())).toMatchObject({ id: 'P-1', sku: 'SKU-1' });
  });

  it('syncCategories posts to category/upsert', async () => {
    const [api, bucket] = createApiWithMock(ProductsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.syncCategories({
      id: 'c1',
      name: 'Apparel',
      hierarchy: 'Root > Apparel',
      url: 'https://shop.example.com/c/1',
      image_url: 'https://shop.example.com/ci/1.jpg',
    });

    expect(new URL(lastRequest(bucket).url).pathname).toMatch(/\/category\/upsert$/);
  });

  it('syncBrands posts to brand/upsert', async () => {
    const [api, bucket] = createApiWithMock(ProductsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.syncBrands({
      id: 'b1',
      name: 'Acme',
      url: 'https://shop.example.com/b/1',
      image_url: 'https://shop.example.com/bi/1.jpg',
    });

    expect(new URL(lastRequest(bucket).url).pathname).toMatch(/\/brand\/upsert$/);
  });
});
