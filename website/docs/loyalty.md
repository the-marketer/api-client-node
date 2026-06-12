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

Returns loyalty info for a subscriber.

**Input**

- `email` (`string`, required, valid email)

**Response**

- `object`

```typescript
const result = await loyaltyApi.getInfo('john@doe.com');
```

## `managePoints`

Increases or decreases loyalty points.

**Input**

- `email` (`string`, required, valid email)
- `action` (`string`, required): `increase` or `decrease`
- `points` (`number`, required, positive)

**Response**

- `object`

```typescript
const result = await loyaltyApi.managePoints('john@doe.com', 'increase', 100);
```
