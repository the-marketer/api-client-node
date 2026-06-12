import { describe, expect, it } from 'vitest';
import { TransactionalsApi } from '../src/api/transactionalsApi';
import { createApiWithMock, lastRequest } from './testCase';

describe('TransactionalsApi', () => {
  it('sendEmail posts the email payload to send-email', async () => {
    const [api, bucket] = createApiWithMock(TransactionalsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.sendEmail({ to: 'john@doe.com', subject: 'Hi', body: '<p>Hi</p>' });

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/transactional\/send-email$/);
    expect(JSON.parse(await req.text())).toMatchObject({
      to: 'john@doe.com',
      subject: 'Hi',
      body: '<p>Hi</p>',
    });
  });

  it('sendEmailAsync posts to queue-send-email', async () => {
    const [api, bucket] = createApiWithMock(TransactionalsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.sendEmailAsync({ to: 'john@doe.com', subject: 'Hi', body: 'B' });

    expect(new URL(lastRequest(bucket).url).pathname).toMatch(
      /\/transactional\/queue-send-email$/,
    );
  });

  it('sendEmailsBulk posts the emails list to batch-send-email', async () => {
    const [api, bucket] = createApiWithMock(TransactionalsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.sendEmailsBulk({
      emails: [{ to: 'a@b.com', subject: 'S', body: 'B' }],
    });

    const req = lastRequest(bucket);
    expect(new URL(req.url).pathname).toMatch(/\/transactional\/batch-send-email$/);
    expect(JSON.parse(await req.text())).toMatchObject({
      emails: [{ to: 'a@b.com' }],
    });
  });

  it('sendSms posts to and content (positional args)', async () => {
    const [api, bucket] = createApiWithMock(TransactionalsApi, [
      { status: 200, body: '{}' },
    ]);

    await api.sendSms('+40123456789', 'Shipped');

    const req = lastRequest(bucket);
    expect(req.method).toBe('POST');
    expect(new URL(req.url).pathname).toMatch(/\/transactional\/send-sms$/);
    expect(JSON.parse(await req.text())).toMatchObject({
      to: '+40123456789',
      content: 'Shipped',
    });
  });
});
