---
id: app-push
title: Mobile push
---

Manage mobile push notification tokens through `client.mobilePush()`.

## Access module

```typescript
const mobilePushApi = client.mobilePush();
```

## `removeToken`

Removes a mobile push token.

**Input**

- `email` (`string`, required, valid email)
- `type` (`string`, required): `ios` or `android`

**Response**

- `object`

```typescript
const result = await mobilePushApi.removeToken('john@doe.com', 'android');
```

## `setToken`

Sets a mobile push token.

**Input**

- `email` (`string`, required, valid email)
- `token` (`string`, required)
- `type` (`string`, required): `ios` or `android`

**Response**

- `object`

```typescript
const result = await mobilePushApi.setToken('john@doe.com', 'DEVICE_TOKEN', 'android');
```
