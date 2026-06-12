export interface ConfigOptions {
  customerId: string;
  restKey: string;
  restUrl?: string;
  trackingUrl?: string;
  trackingKey?: string;
  apiVersion?: string;
}

const DEFAULT_REST_URL = 'https://t.themarketer.com';
const DEFAULT_TRACKING_URL = 'https://t.themarketer.com';
const DEFAULT_TRACKING_KEY = '';
const DEFAULT_API_VERSION = 'v1';

export class Config {
  readonly #customerId: string;
  readonly #restKey: string;
  readonly #restUrl: string;
  readonly #trackingUrl: string;
  readonly #trackingKey: string;
  readonly #apiVersion: string;

  constructor(options: ConfigOptions) {
    this.#customerId = options.customerId;
    this.#restKey = options.restKey;
    this.#restUrl = options.restUrl ?? DEFAULT_REST_URL;
    this.#trackingUrl = options.trackingUrl ?? DEFAULT_TRACKING_URL;
    this.#trackingKey = options.trackingKey ?? DEFAULT_TRACKING_KEY;
    this.#apiVersion = options.apiVersion ?? DEFAULT_API_VERSION;
  }

  get customerId(): string {
    return this.#customerId;
  }

  get restKey(): string {
    return this.#restKey;
  }

  get restUrl(): string {
    return this.#restUrl;
  }

  get trackingUrl(): string {
    return this.#trackingUrl;
  }

  get trackingKey(): string {
    return this.#trackingKey;
  }

  get apiVersion(): string {
    return this.#apiVersion;
  }

  baseRestUrl(): string {
    return `${this.#restUrl.replace(/\/+$/, '')}/api/${this.#apiVersion}/`;
  }
}
