---
id: credentials-utilities
title: Credentials and Utilities
---

These methods are exposed directly on `Client` and delegate internally to `CredentialsClient` (`src/api/credentialsClient.ts`).

## Return types on `Client` vs raw API

- On **`Client`**, `checkCredentials()` and `checkApiCredentials()` return **`boolean`**: `true` when the underlying client receives a JSON body that decodes to an **empty array** `[]` (treated as success in this facade), `false` otherwise.
- Other helpers return **`object`** or **`string`** as documented below.
- If you need the **decoded JSON** from check endpoints (not a boolean), call the same methods on `CredentialsClient` with a configured `ApiContext` (see package tests for patterns).

## `checkApiCredentials`

Verifies REST API credentials.

**Input**

- none

**Response**

- `boolean` (on `Client`)

```typescript
const ok = await client.checkApiCredentials();
```

## `checkCredentials`

Verifies credentials using a **tracking** key (sent in the JSON body as required by the API).

**Input**

- `trackingKey` (`string`, required)

**Response**

- `boolean` (on `Client`)

```typescript
const ok = await client.checkCredentials('YOUR_TRACKING_KEY');
```

## `getCosts`

Returns cost information.

**Input**

- none

**Response**

- `object`

```typescript
const result = await client.getCosts();
```

## `getDeliveryLogs`

Returns delivery logs.

**Input**

- `payload` (`object`):
  - `email` (`string`, required, valid email)
  - `per_page` (`number`, optional, between 1 and 100)
  - `page` (`number`, optional, positive)
  - `start` (`string`, optional, date)
  - `end` (`string`, optional, date)

**Response**

- `object`

```typescript
const result = await client.getDeliveryLogs({
  email: 'john@doe.com',
  per_page: 20,
  page: 1,
});
```

## `getEnteredAutomation`

Returns entered automation data.

**Input**

- `payload` (`object`):
  - `date` (`string`, required, format `Y-m-d`)
  - `page` (`number`, optional, positive)
  - `perPage` (`number`, optional, between 1 and 100)

**Response**

- `object`

```typescript
const result = await client.getEnteredAutomation({
  date: '2026-01-31',
  page: 1,
  perPage: 20,
});
```

## `getRealtimeVisitors`

Returns realtime visitors data.

**Input**

- none

**Response**

- `object`

```typescript
const result = await client.getRealtimeVisitors();
```

## `getReferralLink`

Returns referral link content (raw response body, not JSON-decoded).

**Input**

- `email` (`string`, optional, valid email)

**Response**

- `string`

```typescript
const result = await client.getReferralLink('john@doe.com');
```

## `getSmsCredit`

Returns SMS credit information.

**Input**

- none

**Response**

- `object`

```typescript
const result = await client.getSmsCredit();
```

## `config()`

Returns the immutable `Config` (customer id, rest key, URLs, `baseRestUrl()`, tracking key, etc.).

```typescript
const customerId = client.config().customerId;
const restBase = client.config().baseRestUrl();
```
