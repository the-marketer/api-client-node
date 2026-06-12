---
id: campaigns
title: Campaigns
---

List campaigns, create new campaigns, fetch email reports, and load the latest campaign snapshot. All calls use the **REST** gateway (`k` / `u` query auth). Initialize `Client` with a config object (see [Authentication](./authentication.md)).

## Access module

```typescript
const campaignsApi = client.campaigns();
```

---

## `list`

Lists campaigns with optional filters. Uses **POST** to `/campaigns/list` with a JSON body built from the `ListCampaign` DTO.

**Input**

- `payload` (`object`, optional; default `{}`). All keys are optional strings; empty values are omitted from the body:
  - `filters` (`string`, optional)
  - `search` (`string`, optional)
  - `type` (`string`, optional)
  - `start_date` (`string`, optional)
  - `page` (`string`, optional)
  - `limit` (`string`, optional)

**Response**

- `object`

```typescript
const result = await campaignsApi.list();

const filtered = await campaignsApi.list({
  search: 'spring',
  type: 'email',
  page: '1',
  limit: '20',
});
```

---

## `create`

Creates a campaign. Payload is validated by `CreateCampaign` and nested DTOs, then sent as JSON to `/campaigns/create`.

**Input**

- `payload` (`object`), top-level:
  - `type` (`string`, required): one of `sms`, `email`, `push`
  - `mode` (`string`, required): one of `ecommerce`, `regular`, `plaintext`
  - `sender` (`object`, required):
    - `name` (`string`, required)
    - `sender` (`string`, required, email)
    - `reply_to` (`string`, required, email)
  - `audience` (`object`, required):
    - `audience_type` (`string`, required): currently `all`
    - `smart_sending` (`boolean`, required)
  - `subject` (`object`, required):
    - `name` (`string`, required)
    - `subject_line` (`string`, required)
    - `preview_text` (`string`, required)
  - `content` (`object`, required):
    - `html` (`string`, required): HTML body (max length enforced in DTO)
  - `scheduling` (`object`, required):
    - `send_at` (`string`, required): datetime `Y-m-d H:i`
    - `use_optimal_time` (`number`, required): `0` or `1`
    - `optimize_for` (`string`, required): `opening` or `buying`
  - `tracking` (`object`, required):
    - `utm_campaign` (`string`, required)
    - `utm_medium` (`string`, required)
    - `utm_source` (`string`, required)

**Response**

- `object`

```typescript
const result = await campaignsApi.create({
  type: 'email',
  mode: 'regular',
  sender: {
    name: 'Shop',
    sender: 'shop@example.com',
    reply_to: 'support@example.com',
  },
  audience: {
    audience_type: 'all',
    smart_sending: false,
  },
  subject: {
    name: 'Spring',
    subject_line: 'Hello',
    preview_text: 'Preview',
  },
  content: {
    html: '<p>Hi</p>',
  },
  scheduling: {
    send_at: '2026-06-01 12:00',
    use_optimal_time: 0,
    optimize_for: 'opening',
  },
  tracking: {
    utm_campaign: 'spring-2026',
    utm_medium: 'email',
    utm_source: 'newsletter',
  },
});
```

---

## `getEmailReport`

Returns the email report for a campaign.

**Input**

- `id` (`string`, required): campaign identifier (embedded in the URL path; special characters should be safe for path segments—see API behavior).

**Response**

- `object`

```typescript
const result = await campaignsApi.getEmailReport('99');
```

Internally this calls **GET** `/campaigns/{id}/email/get-report` with standard REST auth query params.

---

## `getLatestCampaign`

Returns the latest campaign data. Uses **GET** `/get-latest-campaign`.

**Input**

- `limit` (`number`, optional): when set, must be **positive**; sent as query param `limit`.

**Response**

- `object` (decoded JSON; shape depends on API)

```typescript
const result = await campaignsApi.getLatestCampaign();

const limited = await campaignsApi.getLatestCampaign(5);
```

---

## Validation and errors

- Invalid or incomplete payloads raise `ValidationException` before the HTTP request.
- Failed API responses are mapped to `UnauthorizedException`, `CustomerNotFoundException`, `MethodNotAllowedException`, or `ApiException` as documented in [Errors and Troubleshooting](./errors.md).

## Source references

- API methods: `src/api/campaignsApi.ts`
- DTOs: `src/dto/campaigns/*.ts`
- Examples in tests: `tests/campaignsApi.test.ts`
