---
id: loyalty
title: Loyalty
---

Read loyalty info and add/remove points.

## Access module

```typescript
const loyaltyApi = client.loyalty();
```

## `getInfo`

Returns loyalty info for a subscriber, identified by `email` or `phone`.

The contact is looked up by `email`; when no `email` is given, `phone` is used.

**Input**

- `email` (`string`, optional, valid email)
- `phone` (`string`, optional)

At least one of `email` or `phone` is required.

**Response**

- `object`

```typescript
const result = await loyaltyApi.getInfo('john@doe.com');

// by phone only
const byPhone = await loyaltyApi.getInfo(null, '+40700000000');
```

## `managePoints`

Increases or decreases loyalty points for a subscriber, identified by `email` or `phone`.

The contact is looked up by `email`; when no `email` is given, `phone` is used.

**Input**

- `email` (`string`, optional, valid email)
- `action` (`string`, required): `increase` or `decrease`
- `points` (`number`, required, positive)
- `phone` (`string`, optional)

At least one of `email` or `phone` is required.

**Response**

- `object`

```typescript
const result = await loyaltyApi.managePoints('john@doe.com', 'increase', 100);

// by phone only
const byPhone = await loyaltyApi.managePoints(null, 'increase', 100, '+40700000000');
```
