import { describe, expect, it } from 'vitest';
import {
  AbstractApi,
  ApiContext,
  ApiException,
  ApiGateway,
  Client,
  Config,
  CustomerNotFoundException,
  MethodNotAllowedException,
  TrackingGateway,
  UnauthorizedException,
  ValidationException,
} from '../src/index';
import type { ClientConfig, ConfigOptions } from '../src/index';

describe('package', () => {
  it('exports foundation modules from the public entry', () => {
    expect(Client).toBeTypeOf('function');
    expect(Config).toBeTypeOf('function');
    expect(ApiContext).toBeTypeOf('function');
    expect(AbstractApi).toBeTypeOf('function');
    expect(ApiGateway).toBeTypeOf('function');
    expect(TrackingGateway).toBeTypeOf('function');
    expect(ApiException).toBeTypeOf('function');
    expect(ValidationException).toBeTypeOf('function');
    expect(UnauthorizedException).toBeTypeOf('function');
    expect(CustomerNotFoundException).toBeTypeOf('function');
    expect(MethodNotAllowedException).toBeTypeOf('function');
  });

  it('exports ClientConfig and ConfigOptions types', () => {
    const configOptions: ConfigOptions = {
      customerId: 'u',
      restKey: 'k',
    };
    const clientConfig: ClientConfig = {
      ...configOptions,
      maxRetryAttempts: 1,
    };
    expect(clientConfig.customerId).toBe('u');
  });
});
