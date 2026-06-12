import { describe, expect, it, vi } from 'vitest';
import { fetchWithRetry } from '../../src/common/retryFetch';

const zeroDelay = () => 0;

function mockResponse(status: number, body = ''): Response {
  return new Response(body, { status });
}

describe('fetchWithRetry', () => {
  it('retries once on 503 then succeeds', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce(mockResponse(503, 'Unavailable'))
      .mockResolvedValueOnce(mockResponse(200, '{"ok":true}'));

    const response = await fetchWithRetry('http://example.test/r', {}, {
      maxRetryAttempts: 1,
      fetchFn,
      delayMs: zeroDelay,
    });

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('{"ok":true}');
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('does not retry on 401', async () => {
    const fetchFn = vi.fn().mockResolvedValueOnce(mockResponse(401, 'Unauthorized'));

    const response = await fetchWithRetry('http://example.test/r', {}, {
      maxRetryAttempts: 1,
      fetchFn,
      delayMs: zeroDelay,
    });

    expect(response.status).toBe(401);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('stops after max retries', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce(mockResponse(503, 'a'))
      .mockResolvedValueOnce(mockResponse(503, 'b'));

    const response = await fetchWithRetry('http://example.test/r', {}, {
      maxRetryAttempts: 1,
      fetchFn,
      delayMs: zeroDelay,
    });

    expect(response.status).toBe(503);
    expect(await response.text()).toBe('b');
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('zero retries does not issue second request', async () => {
    const fetchFn = vi.fn().mockResolvedValueOnce(mockResponse(503, 'once'));

    const response = await fetchWithRetry('http://example.test/r', {}, {
      maxRetryAttempts: 0,
      fetchFn,
      delayMs: zeroDelay,
    });

    expect(response.status).toBe(503);
    expect(await response.text()).toBe('once');
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('retries on network error then succeeds', async () => {
    const fetchFn = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('fetch failed'))
      .mockResolvedValueOnce(mockResponse(200, 'ok'));

    const response = await fetchWithRetry('http://example.test/r', {}, {
      maxRetryAttempts: 1,
      fetchFn,
      delayMs: zeroDelay,
    });

    expect(response.status).toBe(200);
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('rethrows network error when retries exhausted', async () => {
    const error = new TypeError('fetch failed');
    const fetchFn = vi.fn().mockRejectedValue(error);

    await expect(
      fetchWithRetry('http://example.test/r', {}, {
        maxRetryAttempts: 0,
        fetchFn,
        delayMs: zeroDelay,
      }),
    ).rejects.toThrow(error);

    expect(fetchFn).toHaveBeenCalledTimes(1);
  });
});

describe('defaultDelayMs', () => {
  it('uses capped exponential backoff', async () => {
    const { defaultDelayMs } = await import('../../src/common/retryFetch');

    expect(defaultDelayMs(0)).toBe(250);
    expect(defaultDelayMs(1)).toBe(250);
    expect(defaultDelayMs(2)).toBe(500);
    expect(defaultDelayMs(3)).toBe(1000);
    expect(defaultDelayMs(10)).toBe(10_000);
  });
});
