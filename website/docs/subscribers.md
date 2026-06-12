---
id: subscribers
title: Subscribers
---

Manage subscriber lifecycle and audience data.

## Access module

```typescript
const subscribersApi = client.subscribers();
```

## `addSubscriber`

Adds or updates a subscriber via the **synchronous** endpoint (`/add_subscriber_sync`).

**Input**

- `payload` (`object`):
  - `email` (`string`, required)
  - `add_tags` (`string`, optional)
  - `firstname` (`string`, optional)
  - `lastname` (`string`, optional)
  - `phone` (`string`, optional)
  - `city` (`string`, optional)
  - `country` (`string`, optional)
  - `birthday` (`string`, optional)
  - `channels` (`string`, optional)
  - `attributes` (`object`, optional)

**Response**

- `object`

```typescript
const result = await subscribersApi.addSubscriber({
  email: 'john@doe.com',
  firstname: 'John',
  lastname: 'Doe',
});
```

## `addSubscriberAsync`

Same payload shape as `addSubscriber`, but uses the **async** path (`/add_subscriber`).

```typescript
const result = await subscribersApi.addSubscriberAsync({
  email: 'john@doe.com',
});
```

## `addSubscriberBulk`

Adds subscribers in bulk.

**Input**

- `subscribers` (`object[]`): list of subscriber payloads.
  - each item uses the same fields as `addSubscriber` / `addSubscriberAsync` (see above).

**Response**

- `object`

```typescript
const result = await subscribersApi.addSubscriberBulk([
  { email: 'john@doe.com' },
  { email: 'jane@doe.com' },
]);
```

## `addSubscriberByPhone`

Adds a subscriber by phone.

**Input**

- `phone` (`string`, required)
- `firstname` (`string`, optional)
- `lastname` (`string`, optional)

**Response**

- `object`

```typescript
const result = await subscribersApi.addSubscriberByPhone('+40123456789', 'John', 'Doe');
```

## `anonymizeEmail`

Anonymizes a subscriber email.

**Input**

- `email` (`string`)

**Response**

- `object`

```typescript
const result = await subscribersApi.anonymizeEmail('john@doe.com');
```

## `deleteSubscriber`

Deletes a subscriber by `email` and/or `phone`.

**Input**

- `payload` (`object`): must include at least one of:
  - `email` (`string`, optional, must be a valid email when present)
  - `phone` (`string`, optional)

**Response**

- `object`

```typescript
const result = await subscribersApi.deleteSubscriber({
  email: 'john@doe.com',
});
```

## `listSubscribed`

Lists subscribed emails, optionally filtered by a date range.

**Input**

- `dateFrom` (`string`, optional) (sent as `date_from`)
- `dateTo` (`string`, optional) (sent as `date_to`)

**Response**

- `object`

```typescript
const result = await subscribersApi.listSubscribed('2026-01-01', '2026-01-31');
```

## `listUnsubscribed`

Lists unsubscribed emails, optionally filtered by a date range.

**Input**

- `dateFrom` (`string`, optional) (sent as `date_from`)
- `dateTo` (`string`, optional) (sent as `date_to`)

**Response**

- `object`

```typescript
const result = await subscribersApi.listUnsubscribed('2026-01-01', '2026-01-31');
```

## `removeSubscriber`

Removes a subscriber (optionally by channels).

**Input**

- `email` (`string`, required)
- `channels` (`string`, optional)

**Response**

- `object`

```typescript
const result = await subscribersApi.removeSubscriber('john@doe.com', 'email');
```

## `statusSubscriber`

Gets subscriber status for an email.

**Input**

- `email` (`string`, required)

**Response**

- `object`

```typescript
const result = await subscribersApi.statusSubscriber('john@doe.com');
```

## `subscribersEvolution`

Returns subscribers evolution stats.

**Input**

- none

**Response**

- `object`

```typescript
const result = await subscribersApi.subscribersEvolution();
```

## `unsubscribedEmails`

Gets unsubscribed emails in a required date range.

**Input**

- `dateFrom` (`string`, required, format `YYYY-MM-DD`) (sent as `date_from`)
- `dateTo` (`string`, required, format `YYYY-MM-DD`) (sent as `date_to`)

**Response**

- `object`

```typescript
const result = await subscribersApi.unsubscribedEmails('2026-01-01', '2026-01-31');
```

## `updateTags`

Updates subscriber tags.

**Input**

- `email` (`string`, required)
- `addTags` (`(string | number)[]`) (default: `[]`) — sent as `add_tags`
- `removeTags` (`(string | number)[]`) (default: `[]`) — sent as `remove_tags`
- `overwriteExisting` (`number`, optional) (default: `null`) — sent as `overwrite_existing`

**Response**

- `object`

```typescript
const result = await subscribersApi.updateTags(
  'john@doe.com',
  [10, 12],
  [5],
  1,
);
```
