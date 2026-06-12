import { describe, expect, it } from 'vitest';
import { Config } from '../../src/common/config';

describe('Config', () => {
  it('baseRestUrl appends version segment', () => {
    const c = new Config({
      customerId: 'u1',
      restKey: 'k1',
      restUrl: 'https://api.example.com',
      trackingUrl: 'https://track.example.com',
      trackingKey: 'tk',
    });

    expect(c.baseRestUrl()).toBe('https://api.example.com/api/v1/');
  });

  it('accessors return constructor values', () => {
    const c = new Config({
      customerId: 'cid',
      restKey: 'rkey',
      restUrl: 'https://rest.test/',
      trackingUrl: 'https://trk.test/',
      trackingKey: 'trk-key',
      apiVersion: 'v2',
    });

    expect(c.customerId).toBe('cid');
    expect(c.restKey).toBe('rkey');
    expect(c.restUrl).toBe('https://rest.test/');
    expect(c.trackingUrl).toBe('https://trk.test/');
    expect(c.trackingKey).toBe('trk-key');
    expect(c.apiVersion).toBe('v2');
  });

  it('baseRestUrl uses custom apiVersion', () => {
    const c = new Config({
      customerId: 'a',
      restKey: 'b',
      restUrl: 'https://x.com',
      trackingUrl: 'https://y.com',
      trackingKey: '',
      apiVersion: 'v3',
    });

    expect(c.baseRestUrl()).toBe('https://x.com/api/v3/');
  });
});
