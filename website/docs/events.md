---
id: events
title: Events
---

Send standard and custom behavioral events.

```typescript
import { Client } from '@the-marketer/api-client';

const client = new Client({
  customerId: 'YOUR_CUSTOMER_ID',
  restKey: 'YOUR_REST_KEY',
  trackingKey: 'YOUR_TRACKING_KEY', // required for tracking-based event methods
});

const eventsApi = client.events();
```

---

## `sendCustomApi`

Custom event sent through the REST API (without the full tracking fields from `CustomEvent`).

**Input — `payload`**

- `email` (`string`, required, email valid)
- `event` (`string`, required)

**Response**

- `object`

```typescript
const result = await eventsApi.sendCustomApi({
  email: 'user@example.com',
  event: 'newsletter_click',
});
```

---

## `sendCustom`

Custom event sent through **tracking** (`CustomEvent`).

**Input — `payload`**

- `did` (`string`, required) — device/session id
- `email` (`string`, required, email valid)
- `event` (`string`, required)
- `url` (`string`, required, URL valid)
- `http_user_agent` (`string`, required)
- `remote_addr` (`string`, required)
- `source` (`string`, optional)

**Response**

- `object`

```typescript
const result = await eventsApi.sendCustom({
  did: 'device-abc',
  email: 'user@example.com',
  event: 'product_viewed',
  url: 'https://shop.example.com/p/1',
  http_user_agent: 'Mozilla/5.0',
  remote_addr: '203.0.113.10',
});
```

---

## `viewHomepage`

Homepage or generic page view (`ViewHomepageEvent`).

**Input — `payload`**

- `did` (`string`, required)
- `event` (`string`, required) — for example, an event name agreed with the backend
- `url` (`string`, required, URL valid)
- `http_user_agent` (`string`, required)
- `remote_addr` (`string`, required)
- `source` (`string`, optional)

**Response**

- `object`

```typescript
const result = await eventsApi.viewHomepage({
  did: 'device-abc',
  event: 'view_homepage',
  url: 'https://shop.example.com/',
  http_user_agent: 'Mozilla/5.0',
  remote_addr: '203.0.113.10',
});
```

---

## `setEmail`

Associate/set an email in the tracking flow (`SetEmailEvent`).

**Input — `payload`**

- `did` (`string`, required)
- `event` (`string`, required)
- `email_address` (`string`, required, email valid)
- `firstname` (`string`, required)
- `lastname` (`string`, required)
- `phone` (`string`, required)
- `url` (`string`, required, URL valid)
- `http_user_agent` (`string`, required)
- `remote_addr` (`string`, required)
- `source` (`string`, optional)

**Response**

- `object`

---

## `viewProduct`

Product view (`ViewProductEvent`).

**Input — `payload`**

- `did` (`string`, required)
- `event` (`string`, required)
- `product_id` (`string`, required)
- `url` (`string`, required, URL valid)
- `http_user_agent` (`string`, required)
- `remote_addr` (`string`, required)
- `source` (`string`, optional)

**Response**

- `object`

```typescript
const result = await eventsApi.viewProduct({
  did: 'device-abc',
  event: 'view_product',
  product_id: '42',
  url: 'https://shop.example.com/p/42',
  http_user_agent: 'Mozilla/5.0',
  remote_addr: '203.0.113.10',
});
```

---

## `addToCart`

Adds a product line to cart.

**Input — `payload`**

- `did` (`string`, required)
- `event` (`string`, required) — e.g. `add_to_cart`, `remove_from_cart`, ...
- `product_id` (`number`, required, positive) — can be sent as a numeric string; it is normalized
- `quantity` (`number`, required, positive)
- `variation` (`object`, required):
  - `id` (`string`, required)
  - `sku` (`string`, required)
- `http_user_agent` (`string`, required)
- `url` (`string`, required, URL valid)
- `remote_addr` (`string`, required)
- `source` (`string`, optional)

**Response**

- `object`

```typescript
const line = {
  did: 'device-abc',
  event: 'add_to_cart',
  product_id: 100,
  quantity: 1,
  variation: { id: 'var-1', sku: 'SKU-1' },
  http_user_agent: 'Mozilla/5.0',
  url: 'https://shop.example.com/p/100',
  remote_addr: '203.0.113.10',
};

await eventsApi.addToCart(line);
```

---

## `removeFromCart`

Removes a product line from cart.

Uses the same payload schema as `addToCart` (`ProductLineEvent`), with a different `event` value.

```typescript
await eventsApi.removeFromCart({
  ...line,
  event: 'remove_from_cart',
});
```

---

## `addToWishlist`

Adds a product line to wishlist.

Uses the same payload schema as `addToCart` (`ProductLineEvent`), with a different `event` value.

```typescript
await eventsApi.addToWishlist({
  ...line,
  event: 'add_to_wishlist',
});
```

---

## `removeFromWishlist`

Removes a product line from wishlist.

Uses the same payload schema as `addToCart` (`ProductLineEvent`), with a different `event` value.

```typescript
await eventsApi.removeFromWishlist({
  ...line,
  event: 'remove_from_wishlist',
});
```

---

## `initiateCheckout`

Start checkout; uses **`InitiateCheckoutEvent`**, with the same field set as **`ViewHomepageEvent`**.

**Input — `payload`**

- `did`, `event`, `url`, `http_user_agent`, `remote_addr` (required, same as `viewHomepage`)
- `source` (`string`, optional)

**Response**

- `object`

```typescript
const result = await eventsApi.initiateCheckout({
  did: 'device-abc',
  event: 'initiate_checkout',
  url: 'https://shop.example.com/checkout',
  http_user_agent: 'Mozilla/5.0',
  remote_addr: '203.0.113.10',
});
```

---

## `search`

Site search (`SearchEvent`).

**Input — `payload`**

- `did` (`string`, required)
- `event` (`string`, required)
- `search_term` (`string`, required)
- `url` (`string`, required, URL valid)
- `http_user_agent` (`string`, required)
- `remote_addr` (`string`, required)
- `source` (`string`, optional)

**Response**

- `object`

```typescript
const result = await eventsApi.search({
  did: 'device-abc',
  event: 'search',
  search_term: 'running shoes',
  url: 'https://shop.example.com/search?q=running',
  http_user_agent: 'Mozilla/5.0',
  remote_addr: '203.0.113.10',
});
```

---

## `serveJavascript`

Load the tracking JavaScript resource for a given key.

**Input**

- `trackingKey` (`string`, required) — 6–20 characters

**Response**

- `object` (JSON decoded by the gateway)

```typescript
const result = await eventsApi.serveJavascript('abcdef123456');
```
