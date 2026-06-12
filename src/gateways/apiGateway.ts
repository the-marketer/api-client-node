import { Config } from '../common/config';
import { ValidationException } from '../exceptions/validationException';
import { AbstractGateway, type GatewayQuery } from './abstractGateway';

export class ApiGateway extends AbstractGateway {
  constructor(config: Config, maxRetryAttempts = 1, fetchFn?: typeof fetch) {
    super(config, maxRetryAttempts, fetchFn);
  }

  protected assertAuthPresent(): void {
    if (this.config.customerId === '') {
      throw new ValidationException('Customer ID not provided.');
    }

    if (this.config.restKey === '') {
      throw new ValidationException('Rest key not provided.');
    }
  }

  protected authQuery(): GatewayQuery {
    return {
      k: this.config.restKey,
      u: this.config.customerId,
    };
  }

  protected baseUrl(): string {
    return this.config.baseRestUrl();
  }
}
