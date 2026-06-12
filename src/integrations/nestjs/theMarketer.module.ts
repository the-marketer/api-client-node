import { type DynamicModule, Module, type Provider } from '@nestjs/common';
import { Client, type ClientConfig } from '../../client';

/**
 * DI token for the singleton {@link Client}. Consumers may inject either this
 * token (`@Inject(THE_MARKETER_CLIENT)`) or the {@link Client} class directly.
 * Mirrors the Laravel facade alias `themarketer.api-client`.
 */
export const THE_MARKETER_CLIENT = 'THE_MARKETER_CLIENT';

/** Options for {@link TheMarketerModule.forRootAsync}. */
export interface TheMarketerModuleAsyncOptions {
  /** Modules to import so their providers are available to `inject`. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imports?: any[];
  /** Providers to inject into `useFactory`. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
  /** Factory returning the client config (sync or async). */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory: (...args: any[]) => ClientConfig | Promise<ClientConfig>;
}

const clientAlias: Provider = {
  provide: Client,
  useExisting: THE_MARKETER_CLIENT,
};

/**
 * NestJS integration — the Node analogue of the PHP package's Laravel
 * `ApiClientServiceProvider`. Registers a single shared {@link Client} as a
 * global provider, so it can be injected anywhere without re-importing.
 *
 * ```ts
 * @Module({ imports: [TheMarketerModule.forRoot({ customerId, restKey })] })
 * export class AppModule {}
 *
 * @Injectable()
 * class MyService {
 *   constructor(private readonly marketer: Client) {}
 * }
 * ```
 */
@Module({})
export class TheMarketerModule {
  /** Configure with a static config object. */
  static forRoot(config: ClientConfig): DynamicModule {
    return {
      module: TheMarketerModule,
      global: true,
      providers: [
        { provide: THE_MARKETER_CLIENT, useValue: new Client(config) },
        clientAlias,
      ],
      exports: [THE_MARKETER_CLIENT, Client],
    };
  }

  /** Configure with a (possibly async) factory, e.g. reading from ConfigService. */
  static forRootAsync(options: TheMarketerModuleAsyncOptions): DynamicModule {
    return {
      module: TheMarketerModule,
      global: true,
      imports: options.imports ?? [],
      providers: [
        {
          provide: THE_MARKETER_CLIENT,
          useFactory: async (...args: unknown[]) =>
            new Client(await options.useFactory(...args)),
          inject: options.inject ?? [],
        },
        clientAlias,
      ],
      exports: [THE_MARKETER_CLIENT, Client],
    };
  }
}
