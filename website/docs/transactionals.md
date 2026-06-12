---
id: transactionals
title: Transactionals
---

Send transactional email and SMS messages (and queued / bulk email).

## Access module

```typescript
const transactionalsApi = client.transactionals();
```

## `sendEmail`

Sends a transactional email (immediate).

**Input**

- `payload` (`object`):
  - `to` (`string`, required, valid email)
  - `subject` (`string`, required)
  - `body` (`string`, required)
  - `from` (`string`, optional)
  - `reply_to` (`string`, optional, valid email when present)
  - `attachments` (`array`, optional)

**Response**

- `object`

```typescript
const result = await transactionalsApi.sendEmail({
  to: 'john@doe.com',
  subject: 'Order confirmation',
  body: '<p>Your order was received.</p>',
  from: 'no-reply@shop.example',
  reply_to: 'support@shop.example',
});
```

## `sendEmailAsync`

Same payload shape as `sendEmail`, but uses the **queue** endpoint (`/transactional/queue-send-email`).

```typescript
const result = await transactionalsApi.sendEmailAsync({
  to: 'john@doe.com',
  subject: 'Queued',
  body: '<p>Later</p>',
});
```

## `sendEmailsBulk`

Sends multiple emails in one request. Payload:

- `emails`: non-empty list of objects, each valid as `sendEmail` payload.

```typescript
const result = await transactionalsApi.sendEmailsBulk({
  emails: [
    { to: 'a@example.com', subject: 'S1', body: 'B1' },
    { to: 'b@example.com', subject: 'S2', body: 'B2' },
  ],
});
```

## `sendSms`

Sends a transactional SMS.

**Input**

- `to` (`string`, required)
- `content` (`string`, required)

**Response**

- `object`

```typescript
const result = await transactionalsApi.sendSms(
  '+40123456789',
  'Your order has been shipped.',
);
```
