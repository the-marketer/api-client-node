---
name: themarketer-api-client-node
description: >-
  Implementation guide for the Node.js/TypeScript The Marketer API client
  (@themarketer/api-client). Use when integrating The Marketer in a Node/TS
  project — initializing the Client, calling subscribers/orders/campaigns/
  products/transactionals/events/reports/coupons/loyalty/reviews/mobilePush,
  building payloads, handling exceptions, or wiring the NestJS module / Nodemailer
  transport.
---

# The Marketer — Node.js / TypeScript client

`@themarketer/api-client` is the official TypeScript / Node.js client for the
The Marketer API. It provides fully typed access to subscribers, orders,
products, campaigns, transactional messaging, behavioural events, reports and
more.

## Install

```bash
npm install @themarketer/api-client
```

Requirements: Node.js >= 18 (uses native `fetch`).

## Initialize

```ts
import { Client } from '@themarketer/api-client';

const client = new Client({
  customerId: process.env.THEMARKETER_CUSTOMER_ID!, // required
  restKey: process.env.THEMARKETER_REST_KEY!,       // required
  trackingKey: process.env.THEMARKETER_TRACKING_KEY, // required only for tracking events
  restUrl: 'https://t.themarketer.com',             // optional (default)
  trackingUrl: 'https://t.themarketer.com',         // optional (default)
  maxRetryAttempts: 1,                              // optional (default 1)
});
```

Credentials are always passed explicitly to the constructor. To use environment
variables, read `process.env` yourself and pass the values in (as above); the
client never reads the environment on its own.

## Authentication

Handled automatically as query params: REST calls send `u` (customerId) + `k`
(restKey); tracking calls send `k` (trackingKey) + `api_key` (restKey). Tracking
methods require `trackingKey` to be set or they throw `ValidationException`.

## Calling convention

Methods that take a single complex object accept a **payload object**; methods
with a few simple inputs take **positional arguments**.

```ts
// payload-object methods
await client.subscribers().addSubscriber({ email: 'a@b.com', firstname: 'Ana' });
await client.orders().saveOrder({ /* ...order... */ });

// positional-argument methods
await client.subscribers().addSubscriberByPhone('+40700000000', 'Ana', 'Pop');
await client.loyalty().managePoints('a@b.com', 'increase', 100);
await client.orders().updateFeedUrl('https://shop/feed.xml', 'product');
await client.campaigns().getLatestCampaign(5);
await client.mobilePush().setToken('a@b.com', 'device-token', 'ios');
```

All methods are `async` and return the decoded JSON (`Record<string, unknown> |
unknown[]`), except `reviews().getProductReviews()` and `getReferralLink()` which
return a raw `string`.

## Modules and methods

`client.subscribers()` — `statusSubscriber(email)`, `unsubscribedEmails(dateFrom, dateTo)`,
`listUnsubscribed(dateFrom?, dateTo?)`, `listSubscribed(dateFrom?, dateTo?)`,
`subscribersEvolution()`, `addSubscriber(payload)`, `addSubscriberAsync(payload)`,
`addSubscriberByPhone(phone, firstname?, lastname?)`, `addSubscriberBulk(subscribers[])`,
`deleteSubscriber(payload)`, `removeSubscriber(email, channels?)`, `anonymizeEmail(email)`,
`updateTags(email, addTags?, removeTags?, overwriteExisting?)`.

`client.orders()` — `updateOrderStatus(orderNumber, orderStatus)` (GET), `saveOrder(payload)`,
`saveOrderRetail(payload)`, `updateFeedUrl(url, type?)`, `updateOrderFeedUrl(url, type?)`,
`getEcommerceStats()`. `type` ∈ `product | category | brand`.

`client.transactionals()` — `sendEmail(payload)`, `sendSms(to, content)`,
`sendEmailAsync(payload)`, `sendEmailsBulk(payload)`.

`client.products()` — `createProduct(payload)`, `updateProduct(payload)`,
`syncCategories(payload)`, `syncBrands(payload)`.

`client.campaigns()` — `list(payload?)`, `create(payload)`, `getEmailReport(id)`,
`getLatestCampaign(limit?)`.

`client.events()` — `sendCustomApi(payload)` (REST), `sendCustom(payload)`,
`viewHomepage(payload)`, `setEmail(payload)`, `viewProduct(payload)`, `addToCart(payload)`,
`removeFromCart(payload)`, `addToWishlist(payload)`, `removeFromWishlist(payload)`,
`initiateCheckout(payload)`, `search(payload)`, `serveJavascript(trackingKey)`.
All except `sendCustomApi` go through the tracking gateway.

`client.coupons()` — `getAvailableCoupons(email)`, `save(payload)`.

`client.loyalty()` — `getInfo(email)`, `managePoints(email, action, points)`.
`action` ∈ `increase | decrease`.

`client.reviews()` — `getProductReviews(payload?)` → `string`, `createReview(payload)`,
`merchantAddReview(payload)`, `merchantProSetting(payload?)`.

`client.mobilePush()` — `setToken(email, token, type)`, `removeToken(email, type)`.
`type` ∈ `ios | android`.

`client.reports()` — `getEmailCampaigns(payload)`, `getEmailAutomation(payload)`,
`getPushCampaigns(payload)`, `getPushAutomation(payload)`, `getSmsCampaigns(payload)`,
`getSmsAutomation(payload)`, `getFormsPopups(payload)`, `getFormsEmbedded(payload)`,
`getAudience(payload)`. Each payload: `{ type, start, end, previous_start?, previous_end? }`
with `type` from the matching report enum (`EmailReportType`, `SmsPushReportType`,
`FormsReportType`, `AudienceReportType`, exported from the package).

Credential helpers on `client` — `checkApiCredentials()` → `boolean`,
`checkCredentials(trackingKey)` → `boolean`, `getCosts()`, `getRealtimeVisitors()`,
`getSmsCredit()`, `getReferralLink(email?)` → `string`, `getDeliveryLogs(payload)`,
`getEnteredAutomation(payload)`, `config()`.

## Payload examples

```ts
// Save an order
await client.orders().saveOrder({
  number: 1001, email_address: 'a@b.com', phone: '0700', firstname: 'Ana',
  lastname: 'Pop', city: 'Cluj', county: 'CJ', address: 'Str. 1',
  discount_value: 0, discount_code: '-', shipping: 15, tax: 0, total_value: 99,
  products: [{ product_id: 5, price: 84, quantity: 1, variation_sku: 'SKU-5' }],
});

// Email report (enum-typed `type`)
import { EmailReportType } from '@themarketer/api-client';
await client.reports().getEmailCampaigns({ type: 'open-rate', start: '2026-01-01', end: '2026-01-31' });
```

## Errors

Payload validation (Zod) throws `ValidationException` (code 400) before any HTTP
call. HTTP errors map by status: 401 → `UnauthorizedException`, 404 →
`CustomerNotFoundException`, 405 → `MethodNotAllowedException`, anything else →
`ApiException` (with `.code` = status). All are exported from the package.

```ts
import { ValidationException, UnauthorizedException } from '@themarketer/api-client';
try {
  await client.subscribers().addSubscriber({ email: 'not-an-email' });
} catch (e) {
  if (e instanceof ValidationException) { /* fix payload */ }
}
```

## Framework integrations (optional)

### NestJS — `@themarketer/api-client/nestjs`

```ts
import { TheMarketerModule } from '@themarketer/api-client/nestjs';
import { Client } from '@themarketer/api-client';

@Module({ imports: [TheMarketerModule.forRoot({ customerId, restKey })] })
export class AppModule {}

@Injectable()
class MyService {
  constructor(private readonly marketer: Client) {}      // inject by class
  // or: constructor(@Inject(THE_MARKETER_CLIENT) c: Client) {}
}
```

`forRootAsync({ imports, inject, useFactory })` is available for config from
`ConfigService`. The module is global (one shared `Client` singleton).

### Nodemailer transport — `@themarketer/api-client/nodemailer`

```ts
import nodemailer from 'nodemailer';
import { Client } from '@themarketer/api-client';
import { createTheMarketerTransport } from '@themarketer/api-client/nodemailer';

const transporter = nodemailer.createTransport(createTheMarketerTransport(client));
await transporter.sendMail({ to, from, subject, html }); // delivered via transactionals().sendEmail
```

HTML is preferred over plaintext; attachments are base64-encoded.
