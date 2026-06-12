---
id: orders
title: Orders
---

The Orders module manages order syncing, order status updates, feed URL setup, and ecommerce stats.

Obtain `client` via `new Client({ ... })` as described in [Authentication](./authentication.md).

## Access module

```typescript
const ordersApi = client.orders();
```

## `getEcommerceStats`

Returns ecommerce statistics.

**Input**

- none

**Response**

- `object`

```typescript
const stats = await ordersApi.getEcommerceStats();
```

## `saveOrder`

Creates or syncs an order using the standard payload format.

**Input**

- `payload` (`object`):
  - `number` (`number`, required)
  - `email_address` (`string`, required)
  - `phone` (`string`, required)
  - `firstname` (`string`, required)
  - `lastname` (`string`, required)
  - `city` (`string`, required)
  - `county` (`string`, required)
  - `address` (`string`, required)
  - `discount_value` (`number`, required)
  - `discount_code` (`string`, required)
  - `shipping` (`number`, required)
  - `tax` (`number`, required)
  - `total_value` (`number`, required)
  - `products` (`object[]`, required, min 1)
    - `product_id` (`number`, required)
    - `price` (`number`, required)
    - `quantity` (`number`, required)
    - `variation_sku` (`string`, required)

**Response**

- `object`

```typescript
const result = await ordersApi.saveOrder({
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
    {
      product_id: 123,
      price: 99.99,
      quantity: 1,
      variation_sku: 'SKU-123',
    },
  ],
});
```

## `saveOrderRetail`

Creates or syncs an order using the retail payload format.

**Input**

- `payload` (`object`):
  - all fields from `saveOrder` payload, plus:
  - `store_id` (`number`, required)
  - `store_name` (`string`, required)
  - `store_city` (`string`, required)
  - `store_country` (`string`, required)

**Response**

- `object`

```typescript
const result = await ordersApi.saveOrderRetail({
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
    {
      product_id: 123,
      price: 99.99,
      quantity: 1,
      variation_sku: 'SKU-123',
    },
  ],
  store_id: 10,
  store_name: 'Store name',
  store_city: 'Bucharest',
  store_country: 'RO',
});
```

## `updateFeedUrl`

Sets or updates the feed URL.

**Input**

- `url` (`string`, required): feed URL to import from.
- `type` (`string`, optional): allowed values: `product`, `category`, `brand`.

**Response**

- `object`

```typescript
const result = await ordersApi.updateFeedUrl(
  'https://shop.example.com/feed.xml',
  'product',
);
```

## `updateOrderFeedUrl`

Sets or updates the order feed URL.

**Input**

- `url` (`string`): order feed URL.
- `type` (`string`, optional): optional feed type.

**Response**

- `object`

```typescript
const result = await ordersApi.updateOrderFeedUrl(
  'https://shop.example.com/orders-feed.xml',
);
```

## `updateOrderStatus`

Updates the status of an existing order.

**Input**

- `order_number` (`string`): the order identifier.
- `order_status` (`string`): the new status to set.

**Response**

- `object`

```typescript
const result = await ordersApi.updateOrderStatus('1001', 'shipped');
```
