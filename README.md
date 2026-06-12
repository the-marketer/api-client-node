# @themarketer/api-client

TypeScript / Node.js client for the **The Marketer** API.

## Requirements

| Requirement | Version |
|-------------|---------|
| **Node.js** | `>=18` (native `fetch`) |

## Install

```bash
npm install @themarketer/api-client
```

## Usage

```typescript
import 'dotenv/config'; // loads .env into process.env (works on any Node version)
import { Client } from '@themarketer/api-client';

const client = new Client({
  customerId: process.env.THEMARKETER_CUSTOMER_ID!,
  restKey: process.env.THEMARKETER_REST_KEY!,
  trackingKey: process.env.THEMARKETER_TRACKING_KEY,
  maxRetryAttempts: 1,
});

await client.subscribers().addSubscriber({
  email: 'user@example.com',
  firstname: 'Ana',
});
```

Credentials are passed explicitly to the constructor — the client never reads
the environment on its own. Keep them out of source code by storing them in a
`.env` file (`THEMARKETER_CUSTOMER_ID`, `THEMARKETER_REST_KEY`,
`THEMARKETER_TRACKING_KEY`), loading it with [`dotenv`](https://www.npmjs.com/package/dotenv)
(`npm install dotenv`), then reading `process.env` and passing the values in as
shown above. Add `.env` to `.gitignore`.

## Integrations

Optional framework integrations ship as subpath imports; the framework is an
optional peer dependency, so the core client stays dependency-light.

**NestJS** — a global singleton provider:

```typescript
import { TheMarketerModule } from '@themarketer/api-client/nestjs';

@Module({ imports: [TheMarketerModule.forRoot({ customerId, restKey })] })
export class AppModule {}
```

**Nodemailer** — a transport that delivers through the transactional email API:

```typescript
import nodemailer from 'nodemailer';
import { createTheMarketerTransport } from '@themarketer/api-client/nodemailer';

const transporter = nodemailer.createTransport(createTheMarketerTransport(client));
await transporter.sendMail({ to, from, subject, html });
```

## Documentation

A Docusaurus site lives in [`website/`](website/). Run it locally:

```bash
cd website
npm install
npm start        # http://localhost:3000
```

It is deployed to GitHub Pages by `.github/workflows/deploy-docs.yml` on push to `main`.

## Development

```bash
npm install
npm run typecheck
npm run test
npm run build
```

Optional smoke test against a real API (set env vars first):

```bash
THEMARKETER_CUSTOMER_ID=... THEMARKETER_REST_KEY=... npx tsx scripts/smoke.ts
```

For a full architecture guide (layers, request flow, how to navigate the codebase), see **[ARCHITECTURE.md](ARCHITECTURE.md)**.

## Project layout

```
src/
├── index.ts          # public exports
├── client.ts         # Client facade
├── common/           # Config, ApiContext, payload helpers, retry
├── gateways/         # REST + tracking HTTP
├── api/              # API modules (12 + credentials)
├── dto/              # Zod schemas + toApiPayload()
├── enums/
└── exceptions/
tests/                # Vitest
```

## Features

- REST and tracking gateways with auth query params (`k`, `u`, `api_key`)
- HTTP retry on transient failures (408, 425, 429, 5xx)
- Zod validation with descriptive `ValidationException` messages
- ~70 public API methods across 12 modules + credentials utilities on `Client`
