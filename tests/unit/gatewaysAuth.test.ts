import { describe, expect, it } from 'vitest';
import { ValidationException } from '../../src/exceptions';
import { ApiGateway } from '../../src/gateways/apiGateway';
import { TrackingGateway } from '../../src/gateways/trackingGateway';
import {
  createConfig,
  createMockFetch,
  MOCK_API_KEY,
  MOCK_BASE_URL,
  MOCK_DOMAIN,
} from '../testCase';

describe('gateways auth', () => {
  it('ApiGateway get throws when customer id is missing', async () => {
    const { fetchFn } = createMockFetch([{ status: 200 }]);
    const config = createConfig({ customerId: '', restKey: MOCK_API_KEY, restUrl: MOCK_BASE_URL });
    const gw = new ApiGateway(config, 0, fetchFn);

    await expect(gw.get('/x')).rejects.toThrow(
      new ValidationException('Customer ID not provided.'),
    );
  });

  it('ApiGateway get throws when rest key is missing', async () => {
    const { fetchFn } = createMockFetch([{ status: 200 }]);
    const config = createConfig({ customerId: MOCK_DOMAIN, restKey: '', restUrl: MOCK_BASE_URL });
    const gw = new ApiGateway(config, 0, fetchFn);

    await expect(gw.get('/x')).rejects.toThrow(new ValidationException('Rest key not provided.'));
  });

  it('TrackingGateway get throws when tracking key is missing', async () => {
    const { fetchFn } = createMockFetch([{ status: 200 }]);
    const config = createConfig({
      customerId: MOCK_DOMAIN,
      restKey: MOCK_API_KEY,
      restUrl: MOCK_BASE_URL,
      trackingUrl: MOCK_BASE_URL,
      trackingKey: '',
    });
    const gw = new TrackingGateway(config, 0, fetchFn);

    await expect(gw.get('/t/r')).rejects.toThrow(
      new ValidationException('Tracking key not provided.'),
    );
  });
});
