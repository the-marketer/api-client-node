import { z } from 'zod';
import { ValidationException } from '../../exceptions/validationException';
import { validateAndCreate } from '../../common/payload';
import { parseCreateCampaignAudience, createCampaignAudienceToApiPayload } from './createCampaignAudience';
import { parseCreateCampaignContent, createCampaignContentToApiPayload } from './createCampaignContent';
import { parseCreateCampaignScheduling, createCampaignSchedulingToApiPayload } from './createCampaignScheduling';
import { parseCreateCampaignSender, createCampaignSenderToApiPayload } from './createCampaignSender';
import { parseCreateCampaignSubject, createCampaignSubjectToApiPayload } from './createCampaignSubject';
import { parseCreateCampaignTracking, createCampaignTrackingToApiPayload } from './createCampaignTracking';

export const createCampaignSchema = z.object({
  type: z.enum(['sms', 'email', 'push']),
  mode: z.enum(['ecommerce', 'regular', 'plaintext']),
  sender: z.unknown(),
  audience: z.unknown(),
  subject: z.unknown(),
  content: z.unknown(),
  scheduling: z.unknown(),
  tracking: z.unknown(),
});

export type CreateCampaign = {
  type: 'sms' | 'email' | 'push';
  mode: 'ecommerce' | 'regular' | 'plaintext';
  sender: ReturnType<typeof parseCreateCampaignSender>;
  audience: ReturnType<typeof parseCreateCampaignAudience>;
  subject: ReturnType<typeof parseCreateCampaignSubject>;
  content: ReturnType<typeof parseCreateCampaignContent>;
  scheduling: ReturnType<typeof parseCreateCampaignScheduling>;
  tracking: ReturnType<typeof parseCreateCampaignTracking>;
};

const nested: Record<string, (d: unknown) => unknown> = {
  sender: parseCreateCampaignSender,
  audience: parseCreateCampaignAudience,
  subject: parseCreateCampaignSubject,
  content: parseCreateCampaignContent,
  scheduling: parseCreateCampaignScheduling,
  tracking: parseCreateCampaignTracking,
};

export function parseCreateCampaign(data: unknown): CreateCampaign {
  const raw = data as Record<string, unknown>;
  for (const [key, parser] of Object.entries(nested)) {
    const nestedData = raw[key];
    if (typeof nestedData === 'object' && nestedData !== null && !Array.isArray(nestedData)) {
      raw[key] = parser(nestedData);
    } else {
      throw new ValidationException(`${key} must be an array.`);
    }
  }
  validateAndCreate(createCampaignSchema, raw);
  return raw as CreateCampaign;
}

export function createCampaignToApiPayload(dto: CreateCampaign): Record<string, unknown> {
  return {
    type: dto.type, mode: dto.mode,
    sender: createCampaignSenderToApiPayload(dto.sender),
    audience: createCampaignAudienceToApiPayload(dto.audience),
    subject: createCampaignSubjectToApiPayload(dto.subject),
    content: createCampaignContentToApiPayload(dto.content),
    scheduling: createCampaignSchedulingToApiPayload(dto.scheduling),
    tracking: createCampaignTrackingToApiPayload(dto.tracking),
  };
}
