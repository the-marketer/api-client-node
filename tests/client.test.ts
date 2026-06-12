import { describe, expect, it } from 'vitest';
import { Client } from '../src/client';
import { createMockFetch } from './testCase';

describe('Client', () => {
  it('exposes API accessors', () => {
    const client = new Client({
      customerId: 'c',
      restKey: 'k',
      trackingKey: 't',
    });

    expect(client.subscribers()).toBeDefined();
    expect(client.orders()).toBeDefined();
    expect(client.config().customerId).toBe('c');
  });

  it('checkCredentials returns true on empty array response', async () => {
    const { fetchFn } = createMockFetch([{ status: 200, body: '[]' }]);
    const client = new Client({
      customerId: 'c',
      restKey: 'k',
      maxRetryAttempts: 0,
      fetchFn,
    });

    const ok = await client.checkCredentials('track-key');
    expect(ok).toBe(true);
  });
});
