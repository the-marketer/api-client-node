import { version as VERSION } from '../../../package.json';
import type { Client } from '../../client';

/** A single mail address, structurally compatible with Nodemailer. */
export interface MailAddress {
  name?: string;
  address: string;
}

export type MailAddressInput =
  | string
  | MailAddress
  | Array<string | MailAddress>
  | undefined;

/** Subset of a Nodemailer attachment. */
export interface MailAttachmentInput {
  filename?: string;
  content?: string | Buffer;
  contentType?: string;
}

/** Subset of Nodemailer's `mail.data` that this transport consumes. */
export interface MailDataLike {
  to?: MailAddressInput;
  from?: MailAddressInput;
  replyTo?: MailAddressInput;
  subject?: string;
  text?: string | Buffer;
  html?: string | Buffer;
  attachments?: MailAttachmentInput[];
}

export interface MailMessageLike {
  data: MailDataLike;
}

export interface SentInfo {
  messageId: string;
  envelope: { from: string | undefined; to: string[] };
  response: unknown;
}

/**
 * Object structurally compatible with a Nodemailer transport plugin
 * (`{ name, version, send }`), so it can be passed to `nodemailer.createTransport`.
 */
export interface TheMarketerTransport {
  name: string;
  version: string;
  send(
    mail: MailMessageLike,
    callback: (err: Error | null, info?: SentInfo) => void,
  ): void;
}

function firstAddress(input: MailAddressInput): string | undefined {
  if (!input) return undefined;
  const first = Array.isArray(input) ? input[0] : input;
  if (first == null) return undefined;
  const raw = typeof first === 'string' ? first : first.address;
  if (!raw) return undefined;
  const match = raw.match(/<([^>]+)>/);
  return (match?.[1] ?? raw).trim();
}

function asString(value: string | Buffer | undefined): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'string' ? value : value.toString('utf8');
}

function toApiAttachments(
  input: MailAttachmentInput[] | undefined,
): Array<Record<string, unknown>> | undefined {
  if (!input || input.length === 0) return undefined;
  return input.map((a) => {
    const out: Record<string, unknown> = {};
    if (a.filename !== undefined) out.filename = a.filename;
    if (a.contentType !== undefined) out.content_type = a.contentType;
    if (a.content !== undefined) {
      const buf = Buffer.isBuffer(a.content)
        ? a.content
        : Buffer.from(a.content, 'utf8');
      out.content = buf.toString('base64');
    }
    return out;
  });
}

/**
 * Creates a Nodemailer transport that delivers through The Marketer
 * transactional email API — the Node analogue of the PHP package's Laravel
 * `themarketer` mail transport. HTML is preferred over plaintext, attachments
 * are base64-encoded, and `from`/`reply_to` are passed through when present.
 *
 * ```ts
 * import nodemailer from 'nodemailer';
 * import { Client } from '@themarketer/api-client';
 * import { createTheMarketerTransport } from '@themarketer/api-client/nodemailer';
 *
 * const transporter = nodemailer.createTransport(createTheMarketerTransport(client));
 * await transporter.sendMail({ to, from, subject, html });
 * ```
 */
export function createTheMarketerTransport(
  client: Client,
): TheMarketerTransport {
  return {
    name: 'themarketer',
    version: VERSION,
    send(mail, callback) {
      const data = mail.data;
      const to = firstAddress(data.to);

      if (!to) {
        callback(new Error('TheMarketer transport: a "to" address is required.'));
        return;
      }

      const payload: Record<string, unknown> = {
        to,
        subject: data.subject ?? '',
        body: asString(data.html) ?? asString(data.text) ?? '',
      };

      const from = firstAddress(data.from);
      if (from) payload.from = from;

      const replyTo = firstAddress(data.replyTo);
      if (replyTo) payload.reply_to = replyTo;

      const attachments = toApiAttachments(data.attachments);
      if (attachments) payload.attachments = attachments;

      client
        .transactionals()
        .sendEmail(payload)
        .then((response) => {
          callback(null, {
            messageId: `<${Date.now()}@themarketer>`,
            envelope: { from, to: [to] },
            response,
          });
        })
        .catch((err: unknown) => {
          callback(err instanceof Error ? err : new Error(String(err)));
        });
    },
  };
}
