import { Config } from '../common/config';
import { ValidationException } from '../exceptions/validationException';
import { AbstractGateway, type GatewayQuery } from './abstractGateway';

export class TrackingGateway extends AbstractGateway {
  constructor(config: Config, maxRetryAttempts = 1, fetchFn?: typeof fetch) {
    super(config, maxRetryAttempts, fetchFn);
  }

  protected assertAuthPresent(): void {
    if (this.config.trackingKey === '') {
      throw new ValidationException('Tracking key not provided.');
    }
  }

  protected authQuery(): GatewayQuery {
    return {
      k: this.config.trackingKey,
      api_key: this.config.restKey,
    };
  }

  protected baseUrl(): string {
    return `${this.config.trackingUrl.replace(/\/+$/, '')}/`;
  }
}
