import { describe, expect, it } from 'vitest';
import { SubscribersApi } from '../src/api/subscribersApi';
import {
  MOCK_API_KEY,
  MOCK_DOMAIN,
  createApiWithMock,
  lastRequest,
} from './testCase';

describe('SubscribersApi', () => {
  it('statusSubscriber sends GET with email and auth query', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{"status":"active"}' },
    ]);

    const result = await api.statusSubscriber('user@example.com');

    expect(result).toEqual({ status: 'active' });

    const request = lastRequest(bucket);
    expect(request.method).toBe('GET');
    expect(new URL(request.url).pathname).toMatch(/\/status_subscriber$/);

    const query = new URL(request.url).searchParams;
    expect(query.get('k')).toBe(MOCK_API_KEY);
    expect(query.get('u')).toBe(MOCK_DOMAIN);
    expect(query.get('email')).toBe('user@example.com');
  });

  it('unsubscribedEmails sends GET with date_from/date_to', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '[]' },
    ]);

    await api.unsubscribedEmails('2026-01-01', '2026-01-31');

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/unsubscribed_emails$/);
    const q = new URL(req.url).searchParams;
    expect(q.get('date_from')).toBe('2026-01-01');
    expect(q.get('date_to')).toBe('2026-01-31');
  });

  it('listUnsubscribed GETs unsubscribed_emails', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '[]' },
    ]);

    await api.listUnsubscribed('2026-01-01', '2026-01-31');

    const req = lastRequest(bucket);
    expect(req.method).toBe('GET');
    expect(new URL(req.url).pathname).toMatch(/\/unsubscribed_emails$/);
    expect(new URL(req.url).searchParams.get('date_from')).toBe('2026-01-01');
  });

  it('listSubscribed GETs subscribed_emails', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '[]' },
    ]);

    await api.listSubscribed('2026-01-01', '2026-01-31');

    expect(new URL(lastRequest(bucket).url).pathname).toMatch(/\/subscribed_emails$/);
  });

  it('subscribersEvolution GETs subscribers-evolution', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{}' },
    ]);

    await api.subscribersEvolution();

    expect(new URL(lastRequest(bucket).url).pathname).toMatch(/\/subscribers-evolution$/);
  });

  it('addSubscriber sends POST JSON to add_subscriber_sync', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{"ok":true}' },
    ]);

    await api.addSubscriber({ email: 'user@example.com', firstname: 'Ana' });

    const request = lastRequest(bucket);
    expect(request.method).toBe('POST');
    expect(new URL(request.url).pathname).toMatch(/\/add_subscriber_sync$/);
    expect(JSON.parse(await request.text())).toEqual({
      email: 'user@example.com',
      firstname: 'Ana',
    });
  });

  it('addSubscriberAsync posts to add_subscriber', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{}' },
    ]);

    await api.addSubscriberAsync({ email: 'user@example.com' });

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/add_subscriber$/);
  });

  it('addSubscriberByPhone posts phone/firstname/lastname', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{}' },
    ]);

    await api.addSubscriberByPhone('+40123456789', 'John', 'Doe');

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/add_subscriber_by_phone$/);
    expect(JSON.parse(await req.text())).toMatchObject({ phone: '+40123456789' });
  });

  it('addSubscriberBulk posts the subscribers list', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{}' },
    ]);

    await api.addSubscriberBulk([
      { email: 'a@b.com' },
      { email: 'c@d.com' },
    ]);

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/add_subscriber_bulk$/);
    expect(JSON.parse(await req.text())).toEqual([
      { email: 'a@b.com' },
      { email: 'c@d.com' },
    ]);
  });

  it('deleteSubscriber posts to delete_subscriber', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{}' },
    ]);

    await api.deleteSubscriber({ email: 'john@doe.com' });

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/delete_subscriber$/);
    expect(JSON.parse(await req.text())).toMatchObject({ email: 'john@doe.com' });
  });

  it('removeSubscriber posts email and channels', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{}' },
    ]);

    await api.removeSubscriber('john@doe.com', 'email');

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/remove_subscriber$/);
    expect(JSON.parse(await req.text())).toMatchObject({
      email: 'john@doe.com',
      channels: 'email',
    });
  });

  it('anonymizeEmail posts to anonymize-email', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{}' },
    ]);

    await api.anonymizeEmail('john@doe.com');

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/anonymize-email$/);
    expect(JSON.parse(await req.text())).toMatchObject({ email: 'john@doe.com' });
  });

  it('updateTags posts email with add/remove tags', async () => {
    const [api, bucket] = createApiWithMock(SubscribersApi, [
      { status: 200, body: '{}' },
    ]);

    await api.updateTags('john@doe.com', [10, 12], [5], 1);

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/update-tags$/);
    expect(JSON.parse(await req.text())).toMatchObject({
      email: 'john@doe.com',
      add_tags: [10, 12],
      remove_tags: [5],
      overwrite_existing: 1,
    });
  });
});
