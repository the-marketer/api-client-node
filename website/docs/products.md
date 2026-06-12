---
id: products
title: Products
---

Synchronize products, categories, and brands.

## Access module

```typescript
const productsApi = client.products();
```

## `createProduct`

Creates a product.

**Input**

- `payload` (`object`):
  - `id` (`string`, required)
  - `sku` (`string`, required)
  - `name` (`string`, required)
  - `description` (`string`, required)
  - `url` (`string`, required)
  - `main_image` (`string`, required)
  - `category` (`string`, required)
  - `brand` (`string`, required)
  - `acquisition_price` (`number`, required)
  - `price` (`number`, required)
  - `sale_price` (`string`, required)
  - `availability` (`number`, required)
  - `stock` (`number`, required)
  - `media_gallery` (`string[]`, required, exactly 2 items)
  - `created_at` (`string`, required)
  - `extra_attributes` (`object`, optional)
  - `sale_price_start_date` (`string`, optional)
  - `sale_price_end_date` (`string`, optional)

**Response**

- `object`

```typescript
const result = await productsApi.createProduct({
  id: 'SKU-123',
  sku: 'SKU-123',
  name: 'Product name',
  description: 'Product description',
  url: 'https://shop.example.com/products/sku-123',
  main_image: 'https://shop.example.com/images/sku-123.jpg',
  category: 'Category',
  brand: 'Brand',
  acquisition_price: 50.0,
  price: 99.99,
  sale_price: '89.99',
  availability: 1,
  stock: 10,
  media_gallery: [
    'https://shop.example.com/images/sku-123.jpg',
    'https://shop.example.com/images/sku-123-2.jpg',
  ],
  created_at: '2026-01-01T10:00:00Z',
});
```

## `syncBrands`

Creates or updates a brand.

**Input**

- `payload` (`object`):
  - `id` (`string`, required)
  - `name` (`string`, required)
  - `url` (`string`, required)
  - `image_url` (`string`, required)

**Response**

- `object`

```typescript
const result = await productsApi.syncBrands({
  id: 'brand-10',
  name: 'Brand',
  url: 'https://shop.example.com/brands/brand-10',
  image_url: 'https://shop.example.com/images/brands/brand-10.jpg',
});
```

## `syncCategories`

Creates or updates a category.

**Input**

- `payload` (`object`):
  - `id` (`string`, required)
  - `name` (`string`, required)
  - `hierarchy` (`string`, required)
  - `url` (`string`, required)
  - `image_url` (`string`, required)

**Response**

- `object`

```typescript
const result = await productsApi.syncCategories({
  id: 'cat-10',
  name: 'Category',
  hierarchy: 'Root > Category',
  url: 'https://shop.example.com/category/cat-10',
  image_url: 'https://shop.example.com/images/categories/cat-10.jpg',
});
```

## `updateProduct`

Updates an existing product.

**Input**

- `payload` (`object`):
  - `id` (`string`, required)
  - `sku` (`string`, required)
  - `name` (`string`, optional)
  - `description` (`string`, optional)
  - `url` (`string`, optional)
  - `main_image` (`string`, optional)
  - `category` (`string`, optional)
  - `brand` (`string`, optional)
  - `acquisition_price` (`number`, optional)
  - `price` (`number`, optional)
  - `sale_price` (`string`, optional)
  - `availability` (`number`, optional)
  - `stock` (`number`, optional)
  - `media_gallery` (`string[]`, optional, max 2 items)
  - `created_at` (`string`, optional)
  - `extra_attributes` (`object`, optional)
  - `sale_price_start_date` (`string`, optional)
  - `sale_price_end_date` (`string`, optional)

**Response**

- `object`

```typescript
const result = await productsApi.updateProduct({
  id: 'SKU-123',
  sku: 'SKU-123',
  price: 89.99,
  stock: 7,
});
```
