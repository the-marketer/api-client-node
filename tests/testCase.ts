import { ApiContext } from '../src/common/apiContext';
import { Config, type ConfigOptions } from '../src/common/config';
import { AbstractApi } from '../src/common/abstractApi';
import { ApiGateway } from '../src/gateways/apiGateway';
import { TrackingGateway } from '../src/gateways/trackingGateway';

export const MOCK_BASE_URL = 'https://api.example.test';
export const MOCK_DOMAIN = 'domain-1';
export const MOCK_API_KEY = 'api-secret';
export const MOCK_TRACKING_KEY = 'track-key-123456789012';

export function createConfig(overrides: Partial<ConfigOptions> = {}): Config {
  return new Config({
    customerId: MOCK_DOMAIN,
    restKey: MOCK_API_KEY,
    restUrl: MOCK_BASE_URL,
    trackingUrl: MOCK_BASE_URL,
    trackingKey: MOCK_TRACKING_KEY,
    ...overrides,
  });
}

export interface MockFetchResponse {
  status: number;
  body?: string;
  headers?: Record<string, string>;
}

export interface MockFetchHandle {
  fetchFn: typeof fetch;
  getLastRequest: () => Request | null;
}

export function createMockFetch(responses: MockFetchResponse[]): MockFetchHandle {
  let index = 0;
  let lastRequest: Request | null = null;

  const fetchFn: typeof fetch = async (input, init) => {
    const request =
      input instanceof Request ? input : new Request(input, init);
    lastRequest = request;

    const spec = responses[Math.min(index, responses.length - 1)]!;
    index += 1;

    return new Response(spec.body ?? '', {
      status: spec.status,
      headers: spec.headers,
    });
  };

  return {
    fetchFn,
    getLastRequest: () => lastRequest,
  };
}

export interface RequestBucket {
  requests: Request[];
}

export function makeApiContextWithMockClient(
  config: Config,
  fetchFn: typeof fetch,
): ApiContext {
  const restGateway = new ApiGateway(config, 0, fetchFn);
  const trackingGateway = new TrackingGateway(config, 0, fetchFn);
  return new ApiContext(config, 0, fetchFn, {
    rest: restGateway,
    tracking: trackingGateway,
  });
}

export function createApiWithMock<T extends AbstractApi>(
  ApiClass: new (context: ApiContext) => T,
  responses: MockFetchResponse[],
  configOverrides: Partial<ConfigOptions> = {},
): [T, RequestBucket] {
  const config = createConfig(configOverrides);
  const bucket: RequestBucket = { requests: [] };
  let index = 0;

  const fetchFn: typeof fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    bucket.requests.push(request);
    const spec = responses[Math.min(index, responses.length - 1)]!;
    index += 1;
    return new Response(spec.body ?? '', { status: spec.status, headers: spec.headers });
  };

  const context = makeApiContextWithMockClient(config, fetchFn);
  return [new ApiClass(context), bucket];
}

export function lastRequest(bucket: RequestBucket): Request {
  const requests = bucket.requests;
  if (requests.length === 0) {
    throw new Error('Expected at least one HTTP request.');
  }
  return requests[requests.length - 1]!;
}
