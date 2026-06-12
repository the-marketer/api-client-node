# Changelog

## Unreleased

### Breaking

- Aligned 5 methods to the PHP client's positional-argument signatures:
  - `orders().updateFeedUrl(url, type?)` and `orders().updateOrderFeedUrl(url, type?)`
    (previously took a payload object)
  - `campaigns().getLatestCampaign(limit?)` (previously took a payload object)
  - `mobilePush().setToken(email, token, type)` and `mobilePush().removeToken(email, type)`
    (previously took a payload object)
- `apiVersion` is no longer accepted by the `Client` constructor (`ClientConfig`),
  matching the PHP `Client`; it remains configurable on the lower-level `Config`.

### Added

- NestJS integration: `@themarketer/api-client/nestjs` (`TheMarketerModule`).
- Nodemailer transport: `@themarketer/api-client/nodemailer` (`createTheMarketerTransport`).
- `skill/SKILL.md` (Claude skill for the Node client).

## 0.1.0

- Initial TypeScript port of the PHP API client
- Foundation: Config, ApiContext, gateways, retry, exceptions
- Zod DTO validation and payload helpers
- 12 API modules, CredentialsClient, and `Client` facade
- Vitest test suite (foundation + sample API/DTO tests)
