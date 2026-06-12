const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

export function isRetryableStatus(statusCode: number): boolean {
  return RETRYABLE_STATUS_CODES.has(statusCode);
}

export function defaultDelayMs(retries: number): number {
  const ms = Math.min(250 * 2 ** Math.max(0, retries - 1), 10_000);
  return Math.max(0, ms);
}

function shouldRetry(
  retries: number,
  maxRetryAttempts: number,
  response: Response | null,
  error: unknown,
): boolean {
  if (retries >= maxRetryAttempts) {
    return false;
  }

  if (error != null) {
    if (response === null) {
      return true;
    }

    return isRetryableStatus(response.status);
  }

  if (response !== null) {
    return isRetryableStatus(response.status);
  }

  return false;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface FetchWithRetryOptions {
  /** Extra attempts after the first request (e.g. 1 = one retry, two HTTP tries max). */
  maxRetryAttempts: number;
  fetchFn?: typeof fetch;
  /** Milliseconds to wait before each retry; defaults to capped exponential backoff. */
  delayMs?: (retries: number) => number;
}

export async function fetchWithRetry(
  input: string | URL | Request,
  init: RequestInit,
  options: FetchWithRetryOptions,
): Promise<Response> {
  const fetchFn = options.fetchFn ?? fetch;
  const delay = options.delayMs ?? defaultDelayMs;
  const { maxRetryAttempts } = options;

  let retries = 0;

  while (true) {
    try {
      const response = await fetchFn(input, init);

      if (!shouldRetry(retries, maxRetryAttempts, response, null)) {
        return response;
      }
    } catch (error) {
      if (!shouldRetry(retries, maxRetryAttempts, null, error)) {
        throw error;
      }
    }

    const waitMs = delay(retries);
    if (waitMs > 0) {
      await sleep(waitMs);
    }
    retries += 1;
  }
}
