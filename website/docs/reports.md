---
id: reports
title: Reports
---

Retrieve performance data for email, SMS, push, forms, and audience.

## Access module

```typescript
const reportsApi = client.reports();
```

All methods accept a **`query`** object validated by the corresponding payload schema. Dates typically use the format `YYYY-MM-DD`.

---

## `getAudience`

**Input**

- `query` (`object`):
  - `type` (`string`, required): one of:
    - `total-subscribed-emails`, `total-subscribed-sms`, `total-subscribed-push`, `total-subscribed-loyalty`
    - `total-unsubscribed-emails`, `total-unsubscribed-sms`, `total-unsubscribed-push`, `total-unsubscribed-loyalty`
    - `total-active-emails`, `total-inactive-emails`, `total-cleaned-emails`, `total-bounced-emails`
    - `subscribed-emails`, `subscribed-sms`, `subscribed-push`, `subscribed-loyalty`
  - `start` (`string`, required, date)
  - `end` (`string`, required, date)
  - `previous_start` (`string`, optional, date)
  - `previous_end` (`string`, optional, date)

**Response**

- `object`

```typescript
const result = await reportsApi.getAudience({
  type: 'total-subscribed-emails',
  start: '2026-01-01',
  end: '2026-01-31',
});
```

---

## `getEmailAutomation`

Same **`query`** shape as **`getEmailCampaigns`** (next section).

**Response**

- `object`

```typescript
const result = await reportsApi.getEmailAutomation({
  type: 'sent',
  start: '2026-01-01',
  end: '2026-01-31',
});
```

---

## `getEmailCampaigns`

**Input**

- `query` (`object`):
  - `type` (`string`, required): one of:
    - `sent`, `open-rate`, `unique-open-rate`, `click-rate`, `unique-click-rate`
    - `opens`, `unique-opens`, `clicks`, `unique-clicks`
    - `transactions`, `revenue`, `conversion-rate`, `average-order-value`
    - `unsubscribed`, `complaints`, `bounced`, `bounce-rate`, `complaint-rate`, `unsubscribe-rate`
  - `start` (`string`, required, date)
  - `end` (`string`, required, date)
  - `previous_start` (`string`, optional, date)
  - `previous_end` (`string`, optional, date)

**Response**

- `object`

```typescript
const result = await reportsApi.getEmailCampaigns({
  type: 'sent',
  start: '2026-01-01',
  end: '2026-01-31',
});
```

---

## `getFormsEmbedded`

Same **`query`** shape as **`getFormsPopups`** (see **`getFormsPopups`** below).

**Response**

- `object`

```typescript
const result = await reportsApi.getFormsEmbedded({
  type: 'impressions',
  start: '2026-01-01',
  end: '2026-01-31',
});
```

---

## `getFormsPopups`

**Input**

- `query` (`object`):
  - `type` (`string`, required): one of:
    - `total-impressions`, `total-subscribed-users`, `total-subscribe-rate`
    - `impressions`, `subscribed-users`, `subscribe-rate`
  - `start` (`string`, required, date)
  - `end` (`string`, required, date)
  - `previous_start` (`string`, optional, date)
  - `previous_end` (`string`, optional, date)

**Response**

- `object`

```typescript
const result = await reportsApi.getFormsPopups({
  type: 'impressions',
  start: '2026-01-01',
  end: '2026-01-31',
});
```

---

## `getPushAutomation`

Same **`query`** shape as **`getPushCampaigns`** (see **`getPushCampaigns`** below).

**Response**

- `object`

```typescript
const result = await reportsApi.getPushAutomation({
  type: 'sent',
  start: '2026-01-01',
  end: '2026-01-31',
});
```

---

## `getPushCampaigns`

**Input**

- `query` (`object`):
  - `type` (`string`, required): one of:
    - `sent`, `click-rate`, `unique-click-rate`, `clicks`, `unique-clicks`
    - `transactions`, `revenue`, `conversion-rate`, `average-order-value`
    - `unsubscribed`, `unsubscribed-rate`
  - `start` (`string`, required, date)
  - `end` (`string`, required, date)
  - `previous_start` (`string`, optional, date)
  - `previous_end` (`string`, optional, date)

**Response**

- `object`

```typescript
const result = await reportsApi.getPushCampaigns({
  type: 'sent',
  start: '2026-01-01',
  end: '2026-01-31',
});
```

---

## `getSmsAutomation`

Same **`query`** shape as **`getSmsCampaigns`** (see **`getSmsCampaigns`** below).

**Response**

- `object`

```typescript
const result = await reportsApi.getSmsAutomation({
  type: 'sent',
  start: '2026-01-01',
  end: '2026-01-31',
});
```

---

## `getSmsCampaigns`

**Input**

- `query` (`object`): same fields as **`getPushCampaigns`** (SMS and push reports share the same `type` values).

**Response**

- `object`

```typescript
const result = await reportsApi.getSmsCampaigns({
  type: 'sent',
  start: '2026-01-01',
  end: '2026-01-31',
});
```
