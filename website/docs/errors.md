---
id: errors
title: Errors and Troubleshooting
sidebar_position: 19
---

## Exception mapping

| HTTP status | Exception |
| --- | --- |
| `401` | `UnauthorizedException` |
| `404` | `CustomerNotFoundException` |
| `405` | `MethodNotAllowedException` |
| Other API errors | `ApiException` |

Local payload/config validation failures are raised as `ValidationException`.

**Before any HTTP request**, gateways also validate auth context:

- **REST** (`ApiGateway`): `customerId` and `restKey` must be non-empty.
- **Tracking** (`TrackingGateway`): `trackingKey` must be non-empty for tracking endpoints.

## Most common exceptions

## `ValidationException`

Appears when payload input is invalid before request execution, or when required config (customer id, rest key, tracking key) is missing for the gateway in use.

Typical causes:

- missing required fields in payload
- invalid email format
- invalid enum/choice values
- invalid date format
- empty `trackingKey` while calling tracking-only flows (configure `trackingKey` in the `Client` config)

## `UnauthorizedException`

Appears when credentials are invalid (`401`).

Typical causes:

- wrong `customerId` or `restKey`
- expired/revoked credentials

## `CustomerNotFoundException`

Appears when customer is not found (`404`).

Typical causes:

- invalid customer/account context

## `MethodNotAllowedException`

Appears when endpoint does not allow that HTTP method (`405`).

Typical causes:

- endpoint/method mismatch

## `ApiException`

Generic API exception for non-mapped errors.

Typical causes:

- business validation errors returned by API
- temporary upstream API issues

## JSON decoding errors

Raised when a response body cannot be parsed as JSON.

Typical causes:

- invalid JSON response body

## Network / transport errors

The underlying `fetch` call rejects on transport-level failures.

Typical causes:

- timeouts
- connection failures
- DNS/TLS issues

## Fast troubleshooting checklist

- Run `checkApiCredentials()` before business calls (returns `boolean` on `Client`; see [Credentials and Utilities](./credentials-utilities.md)).
- For tracking features, ensure `trackingKey` is set in the client config and use `checkCredentials(key)` as needed.
- Log request/response metadata.
- Validate payload shape before sending.
- Reproduce with a minimal payload.
