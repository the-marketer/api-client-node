---
id: nodemailer
title: Nodemailer
---

# Nodemailer transport

Delivers mail through the transactional email API, so any Nodemailer-based code
(including NestJS Mailer) can send via The Marketer.

Import from `@themarketer/api-client/nodemailer`. `nodemailer` is an optional
peer dependency.

## Usage

```typescript
import nodemailer from 'nodemailer';
import { Client } from '@themarketer/api-client';
import { createTheMarketerTransport } from '@themarketer/api-client/nodemailer';

const client = new Client({ customerId, restKey });
const transporter = nodemailer.createTransport(createTheMarketerTransport(client));

await transporter.sendMail({
  to: 'john@doe.com',
  from: 'shop@example.com',
  replyTo: 'help@example.com',
  subject: 'Welcome',
  html: '<h1>Hello!</h1>',
  attachments: [{ filename: 'guide.pdf', content: pdfBuffer }],
});
```

## Mapping

The transport maps a Nodemailer message to `transactionals().sendEmail()`:

| Nodemailer field | API payload | Notes |
|---|---|---|
| `to` | `to` | first address; `Name <email>` is unwrapped |
| `subject` | `subject` | |
| `html` / `text` | `body` | **HTML preferred** over plaintext |
| `from` | `from` | omitted if absent |
| `replyTo` | `reply_to` | omitted if absent |
| `attachments[]` | `attachments[]` | content **base64-encoded**, with `content_type` |

A message with no recipient is rejected with an error.
