import { filterNonEmpty } from '../common/payload';

/** Tracking event payload with optional `source` omitted when empty. */
export function trackingEventToApiPayload(
  fields: Record<string, unknown>,
  optionalSource?: string | null,
): Record<string, unknown> {
  const body = { ...fields };
  const sourcePayload = filterNonEmpty({ source: optionalSource ?? undefined });
  if ('source' in sourcePayload) {
    body.source = sourcePayload.source;
  }
  return body;
}

/** Serializes a plain DTO to API payload (default AbstractPayload behavior). */
export function defaultToApiPayload(dto: Record<string, unknown>): Record<string, unknown> {
  return { ...dto };
}
