---
id: nestjs
title: NestJS
---

# NestJS

Registers a single shared `Client` as a **global** provider, injectable anywhere
in your NestJS app.

Import from the subpath `@themarketer/api-client/nestjs`. `@nestjs/common` is an
optional peer dependency (already present in a NestJS app).

## Register the module

```typescript
import { Module } from '@nestjs/common';
import { TheMarketerModule } from '@themarketer/api-client/nestjs';

@Module({
  imports: [
    TheMarketerModule.forRoot({
      customerId: process.env.THEMARKETER_CUSTOMER_ID!,
      restKey: process.env.THEMARKETER_REST_KEY!,
      trackingKey: process.env.THEMARKETER_TRACKING_KEY,
    }),
  ],
})
export class AppModule {}
```

### Async configuration

```typescript
import { ConfigModule, ConfigService } from '@nestjs/config';

TheMarketerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    customerId: config.getOrThrow('THEMARKETER_CUSTOMER_ID'),
    restKey: config.getOrThrow('THEMARKETER_REST_KEY'),
  }),
});
```

## Inject the client

By class, or via the `THE_MARKETER_CLIENT` token:

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@themarketer/api-client';
import { THE_MARKETER_CLIENT } from '@themarketer/api-client/nestjs';

@Injectable()
export class NewsletterService {
  constructor(private readonly marketer: Client) {}
  // or: constructor(@Inject(THE_MARKETER_CLIENT) private readonly marketer: Client) {}

  subscribe(email: string) {
    return this.marketer.subscribers().addSubscriber({ email });
  }
}
```
