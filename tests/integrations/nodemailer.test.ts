import { describe, expect, it } from 'vitest';
import type { Client } from '../../src/client';
import {
  createTheMarketerTransport,
  type MailMessageLike,
  type SentInfo,
} from '../../src/integrations/nodemailer';

function stubClient(capture: (payload: Record<string, unknown>) => void): Client {
  return {
    transactionals: () => ({
      sendEmail: async (payload: Record<string, unknown>) => {
        capture(payload);
        return { queued: true };
      },
    }),
  } as unknown as Client;
}

function send(
  client: Client,
  data: MailMessageLike['data'],
): Promise<SentInfo | undefined> {
  const transport = createTheMarketerTransport(client);
  return new Promise((resolve, reject) => {
    transport.send({ data }, (err, info) =>
      err ? reject(err) : resolve(info),
    );
  });
}

describe('createTheMarketerTransport', () => {
  it('maps a message to a sendEmail payload (HTML preferred, attachments base64)', async () => {
    let captured: Record<string, unknown> | undefined;
    const info = await send(
      stubClient((p) => {
        captured = p;
      }),
      {
        to: 'Jane <jane@example.com>',
        from: 'shop@example.com',
        replyTo: 'help@example.com',
        subject: 'Hi',
        text: 'plain fallback',
        html: '<b>rich</b>',
        attachments: [
          { filename: 'a.txt', content: 'hello', contentType: 'text/plain' },
        ],
      },
    );

    expect(captured).toEqual({
      to: 'jane@example.com',
      subject: 'Hi',
      body: '<b>rich</b>',
      from: 'shop@example.com',
      reply_to: 'help@example.com',
      attachments: [
        {
          filename: 'a.txt',
          content_type: 'text/plain',
          content: Buffer.from('hello').toString('base64'),
        },
      ],
    });
    expect(info?.envelope.to).toEqual(['jane@example.com']);
  });

  it('falls back to plaintext when no HTML is present', async () => {
    let captured: Record<string, unknown> | undefined;
    await send(
      stubClient((p) => {
        captured = p;
      }),
      { to: 'jane@example.com', subject: 'Hi', text: 'plain only' },
    );

    expect(captured).toMatchObject({ body: 'plain only' });
  });

  it('errors when no recipient is provided', async () => {
    await expect(
      send(stubClient(() => undefined), { subject: 'no recipient' }),
    ).rejects.toThrow(/to.*required/i);
  });
});
