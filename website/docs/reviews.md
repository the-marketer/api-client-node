---
id: reviews
title: Reviews
---

Manage product and merchant reviews.

## Access module

```typescript
const reviewsApi = client.reviews();
```

## `createReview`

Creates a review payload (customer-facing flow).

**Input**

- `payload` (`object`):
  - `order_id` (`string`, required)
  - `review_date` (`string`, required)
  - `order_rating` (`string`, optional)
  - `order_review` (`string`, optional)
  - `product_rating` (`array`, optional)
  - `product_review` (`array`, optional)
  - `media_files` (`array`, optional)

**Response**

- `object`

```typescript
const result = await reviewsApi.createReview({
  order_id: '1001',
  review_date: '2026-01-01',
  order_rating: '5',
  order_review: 'Fast delivery',
});
```

## `getProductReviews`

Returns product reviews feed content (response body as **`string`**, not auto-decoded JSON).

**Input**

- `query` (`object`, all optional):
  - `t` (`number`, optional, positive)
  - `page` (`number`, optional, positive)
  - `perPage` (`number`, optional, positive)

**Response**

- `string`

```typescript
const result = await reviewsApi.getProductReviews({
  page: 1,
  perPage: 20,
});
```

## `merchantAddReview`

Adds a merchant review.

**Input**

- `payload` (`object`):
  - `email` (`string`, required, valid email)
  - `product_id` (`string | number`, required)
  - `name` (`string`, optional)
  - `date_created` (`string`, optional)
  - `rating` (`number`, optional, positive or zero)
  - `content` (`string`, optional)

**Response**

- `object`

```typescript
const result = await reviewsApi.merchantAddReview({
  email: 'john@doe.com',
  product_id: 123,
  rating: 5,
  content: 'Great product',
});
```

## `merchantProSetting`

Updates Merchant Pro settings.

**Input**

- `payload` (`object`, all optional):
  - `product_feed_url` (`string`, optional)
  - `inventory_feed_url` (`string`, optional)
  - `order_feed_url` (`string`, optional)
  - `api_key` (`string`, optional)
  - `api_password` (`string`, optional)

**Response**

- `object`

```typescript
const result = await reviewsApi.merchantProSetting({
  product_feed_url: 'https://shop.example.com/products.xml',
  inventory_feed_url: 'https://shop.example.com/inventory.xml',
  order_feed_url: 'https://shop.example.com/orders.xml',
});
```
