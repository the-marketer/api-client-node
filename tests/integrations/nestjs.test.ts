import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
import { Client } from '../../src/client';
import {
  THE_MARKETER_CLIENT,
  TheMarketerModule,
} from '../../src/integrations/nestjs';

describe('TheMarketerModule', () => {
  it('forRoot registers a global singleton Client and exports it', () => {
    const mod = TheMarketerModule.forRoot({ customerId: 'c', restKey: 'k' });

    expect(mod.global).toBe(true);
    expect(mod.exports).toContain(THE_MARKETER_CLIENT);
    expect(mod.exports).toContain(Client);

    const providers = (mod.providers ?? []) as unknown as Array<
      Record<string, unknown>
    >;
    const tokenProvider = providers.find(
      (p) => p.provide === THE_MARKETER_CLIENT,
    );
    expect(tokenProvider?.useValue).toBeInstanceOf(Client);

    const classAlias = providers.find((p) => p.provide === Client);
    expect(classAlias?.useExisting).toBe(THE_MARKETER_CLIENT);
  });

  it('forRootAsync builds the Client from a (possibly async) factory', async () => {
    const mod = TheMarketerModule.forRootAsync({
      useFactory: () => ({ customerId: 'c', restKey: 'k' }),
    });

    const providers = (mod.providers ?? []) as unknown as Array<
      Record<string, unknown>
    >;
    const tokenProvider = providers.find(
      (p) => p.provide === THE_MARKETER_CLIENT,
    );
    const factory = tokenProvider?.useFactory as () => Promise<Client>;

    expect(await factory()).toBeInstanceOf(Client);
  });
});
