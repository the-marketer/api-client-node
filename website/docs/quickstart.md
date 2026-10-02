---
id: quickstart
title: Quickstart
sidebar_position: 3
---

## 1) Install

```bash
npm install @the-marketer/api-client
```

## 2) Initialize client

`Client` accepts a **single config object** (see the `Client` constructor). Only `customerId` and `restKey` are required for REST calls; the rest are optional and merge with the defaults below.

| Key | Type | Default | Purpose |
| --- | --- | --- | --- |
| `customerId` | `string` | `''` | Account identifier; sent as `u` on REST requests. **Required** for real usage. |
| `restKey` | `string` | `''` | REST API secret; sent as `k` on REST requests. **Required** for real usage. |
| `trackingKey` | `string` | `''` | Tracking / behavioral API key; needed for tracking-based calls (e.g. some `events()` flows). |
| `restUrl` | `string` | `https://t.themarketer.com` | Base URL for REST (`ApiGateway`). |
| `trackingUrl` | `string` | `https://t.themarketer.com` | Base URL for tracking (`TrackingGateway`). |
| `maxRetryAttempts` | `number` | `1` | Retries per gateway HTTP layer when requests fail transiently. |

```typescript
import { Client } from '@the-marketer/api-client';

const client = new Client({
  customerId: 'YOUR_CUSTOMER_ID',
  restKey: 'YOUR_REST_KEY',
  trackingKey: 'YOUR_TRACKING_KEY',
  restUrl: 'https://t.themarketer.com',
  trackingUrl: 'https://t.themarketer.com',
  maxRetryAttempts: 1,
});
```

Omit optional keys to use the defaults above. For credential signing details, see [Authentication](./authentication.md).

### From environment variables

The client never reads the environment itself — you read `process.env` and pass
the values to the constructor. Keep credentials out of source code by storing
them in a `.env` file and loading it with [`dotenv`](https://www.npmjs.com/package/dotenv):

```bash
npm install dotenv
```

```bash
# .env
THEMARKETER_CUSTOMER_ID=your_customer_id
THEMARKETER_REST_KEY=your_rest_key
THEMARKETER_TRACKING_KEY=your_tracking_key
```

```typescript
import 'dotenv/config'; // loads .env into process.env (works on any Node version)
import { Client } from '@the-marketer/api-client';

const client = new Client({
  customerId: process.env.THEMARKETER_CUSTOMER_ID,
  restKey: process.env.THEMARKETER_REST_KEY,
  trackingKey: process.env.THEMARKETER_TRACKING_KEY,
});
```

Make sure `import 'dotenv/config'` runs **before** you read `process.env`. Add
`.env` to `.gitignore` so secrets are never committed.

## 3) Check API credentials

On `Client`, this returns **`boolean`** (`true` if the API indicates success with an empty JSON array body).

```typescript
const ok = await client.checkApiCredentials();
```

## 4) Save an order

Use the field names expected by `saveOrder()` (for example `number`, `email_address`, and line items with `variation_sku`):

```typescript
const response = await client.orders().saveOrder({
  number: 1001,
  email_address: 'john@doe.com',
  phone: '+40123456789',
  firstname: 'John',
  lastname: 'Doe',
  city: 'Bucharest',
  county: 'RO',
  address: 'Street 1',
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

See [Orders](./orders.md) for retail (`saveOrderRetail`) and other methods.
