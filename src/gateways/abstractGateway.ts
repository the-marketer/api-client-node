import { Config } from "../common/config";
import { fetchWithRetry } from "../common/retryFetch";
import { ApiException } from "../exceptions/apiException";
import { CustomerNotFoundException } from "../exceptions/customerNotFoundException";
import { MethodNotAllowedException } from "../exceptions/methodNotAllowedException";
import { UnauthorizedException } from "../exceptions/unauthorizedException";

const USER_AGENT = "TheMarketer API Client";

export type GatewayQuery = Record<string, string>;

export type GatewayBody = Record<string, unknown> | unknown[];

export type GatewayJsonResult = Record<string, unknown> | unknown[];

/** Converts a payload object to string query parameters for GET requests. */
export function toGatewayQuery(payload: Record<string, unknown>): GatewayQuery {
  const query: GatewayQuery = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === null || value === undefined) {
      continue;
    }
    if (typeof value === "object") {
      continue;
    }
    query[key] = String(value);
  }
  return query;
}

export abstract class AbstractGateway {
  protected readonly maxRetryAttempts: number;
  protected readonly fetchFn: typeof fetch;

  constructor(protected readonly config: Config, maxRetryAttempts = 1, fetchFn?: typeof fetch,
  ) {
    this.maxRetryAttempts = maxRetryAttempts;
    this.fetchFn = fetchFn ?? fetch;
  }

  protected abstract assertAuthPresent(): void;

  protected abstract authQuery(): GatewayQuery;

  protected abstract baseUrl(): string;

  async get(endpoint: string, query?: GatewayQuery, json?: true): Promise<GatewayJsonResult>;

  async get(endpoint: string, query: GatewayQuery, json: false): Promise<string>;

  async get(endpoint: string, query: GatewayQuery = {}, json = true): Promise<GatewayJsonResult | string> 
  {
    return this.request("GET", endpoint, {}, query, json);
  }

  async post(endpoint: string, data?: GatewayBody, query?: GatewayQuery, json?: true): Promise<GatewayJsonResult>;

  async post(endpoint: string, data: GatewayBody, query: GatewayQuery, json: false): Promise<string>;
  
  async post(endpoint: string, data: GatewayBody = {}, query: GatewayQuery = {}, json = true): Promise<GatewayJsonResult | string> 
  {
    return this.request("POST", endpoint, data, query, json);
  }

  async put(
    endpoint: string,
    data: Record<string, unknown> = {},
    query: GatewayQuery = {},
    json = true,
  ): Promise<GatewayJsonResult | string> {
    return this.request("PUT", endpoint, data, query, json);
  }

  async patch(
    endpoint: string,
    data: Record<string, unknown> = {},
    query: GatewayQuery = {},
    json = true,
  ): Promise<GatewayJsonResult | string> {
    return this.request("PATCH", endpoint, data, query, json);
  }

  async delete(
    endpoint: string,
    data: Record<string, unknown> = {},
    query: GatewayQuery = {},
    json = true,
  ): Promise<GatewayJsonResult | string> {
    return this.request("DELETE", endpoint, data, query, json);
  }

  isSuccessful(response: Response): boolean {
    return response.status >= 200 && response.status < 300;
  }

  async decodeJson(response: Response): Promise<GatewayJsonResult> {
    const body = await response.text();
    if (body === "") {
      return [];
    }

    const decoded: unknown = JSON.parse(body);
    return Array.isArray(decoded)
      ? decoded
      : typeof decoded === "object" && decoded !== null
        ? (decoded as Record<string, unknown>)
        : [];
  }

  getConfig(): Config {
    return this.config;
  }

  private async request(
    method: string,
    endpoint: string,
    data: GatewayBody,
    query: GatewayQuery,
    json: boolean,
  ): Promise<GatewayJsonResult | string> {
    this.assertAuthPresent();

    const mergedQuery = { ...this.authQuery(), ...query };
    const url = buildRequestUrl(endpoint, this.baseUrl(), mergedQuery);

    const headers: Record<string, string> = {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const init: RequestInit = { method, headers };
    if (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0) {
      init.body = JSON.stringify(data);
    }

    const response = await fetchWithRetry(url, init, {
      maxRetryAttempts: this.maxRetryAttempts,
      fetchFn: this.fetchFn,
    });

    if (!this.isSuccessful(response)) {
      await this.throwForErrorResponse(response);
    }

    if (json) {
      return this.decodeJson(response);
    }

    return response.text();
  }

  private async throwForErrorResponse(response: Response): Promise<never> {
    const status = response.status;
    const message = await this.extractErrorMessage(response);

    switch (status) {
      case 401:
        throw new UnauthorizedException(message);
      case 404:
        throw new CustomerNotFoundException(message);
      case 405:
        throw new MethodNotAllowedException(message);
      default:
        throw new ApiException(message, status);
    }
  }

  private async extractErrorMessage(response: Response): Promise<string> {
    const body = await response.text();
    if (body === "") {
      return "Request failed";
    }

    try {
      const decoded: unknown = JSON.parse(body);
      if (
        typeof decoded === "object" &&
        decoded !== null &&
        !Array.isArray(decoded)
      ) {
        const message = (decoded as Record<string, unknown>).message;
        return typeof message === "string" ? message : "";
      }
    } catch {
      // fall through to raw body
    }

    if (body.length > 500) {
      return `${body.slice(0, 500)}…`;
    }

    return body;
  }
}

function buildRequestUrl(
  endpoint: string,
  baseUrl: string,
  query: GatewayQuery,
): string {
  const path = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}${endpoint.replace(/^\//, "")}`;
  const url = new URL(path);

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}
