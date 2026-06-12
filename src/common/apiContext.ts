import type { AbstractGateway } from '../gateways/abstractGateway';
import { ApiGateway } from '../gateways/apiGateway';
import { TrackingGateway } from '../gateways/trackingGateway';
import { Config } from './config';

type GatewayName = 'rest' | 'tracking';

export class ApiContext {
  readonly config: Config;
  private readonly maxRetryAttempts: number;
  private readonly fetchFn?: typeof fetch;
  private readonly gateways: Partial<Record<GatewayName, AbstractGateway>>;

  constructor(
    config: Config,
    maxRetryAttempts = 1,
    fetchFn?: typeof fetch,
    initialGateways?: Partial<Record<GatewayName, AbstractGateway>>,
  ) {
    this.config = config;
    this.maxRetryAttempts = maxRetryAttempts;
    this.fetchFn = fetchFn;
    this.gateways = { ...initialGateways };

    return new Proxy(this, {
      get: (target, prop, receiver) => {
        if (
          typeof prop === 'string' &&
          !ApiContext.isPublicMember(target, prop)
        ) {
          throw new Error(`Unknown gateway: ${prop}`);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as this;
  }

  get rest(): ApiGateway {
    return this.resolveGateway('rest') as ApiGateway;
  }

  get tracking(): TrackingGateway {
    return this.resolveGateway('tracking') as TrackingGateway;
  }

  private static isPublicMember(target: ApiContext, prop: string): boolean {
    if (prop in target) {
      return true;
    }

    const proto = Object.getPrototypeOf(target) as object;
    return prop in proto;
  }

  private resolveGateway(name: GatewayName): AbstractGateway {
    const existing = this.gateways[name];
    if (existing !== undefined) {
      return existing;
    }

    const gateway =
      name === 'rest'
        ? new ApiGateway(this.config, this.maxRetryAttempts, this.fetchFn)
        : new TrackingGateway(this.config, this.maxRetryAttempts, this.fetchFn);

    this.gateways[name] = gateway;
    return gateway;
  }
}
