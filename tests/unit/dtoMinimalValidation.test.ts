import { describe, expect, it } from 'vitest';
import { parseCampaignId } from '../../src/dto/campaigns/campaignId';
import { parseCheckCredentials } from '../../src/dto/credentials/checkCredentials';
import { parseEmailValidator } from '../../src/dto/subscribers/emailValidator';
import { parseSaveOrder } from '../../src/dto/orders/saveOrder';
import { parseCreateCampaign } from '../../src/dto/campaigns/createCampaign';

const orderLine = { product_id: 1, price: 1.0, quantity: 1, variation_sku: 'v' };
const saveOrder = {
  number: 1,
  email_address: 'buyer@example.com',
  phone: '+40123456789',
  firstname: 'A',
  lastname: 'B',
  city: 'C',
  county: 'RO',
  address: 'Str 1',
  discount_value: 0.0,
  discount_code: '-',
  shipping: 0.0,
  tax: 0.0,
  total_value: 10.0,
  products: [orderLine],
};

const campaignNested = {
  type: 'email',
  mode: 'regular',
  sender: { name: 'N', sender: 'a@b.com', reply_to: 'r@b.com' },
  audience: { audience_type: 'all', smart_sending: false },
  subject: { name: 'S', subject_line: 'Subj', preview_text: 'Prev' },
  content: { html: '<p>x</p>' },
  scheduling: { send_at: '2025-06-01 12:00', use_optimal_time: 0, optimize_for: 'opening' },
  tracking: { utm_campaign: 'c', utm_medium: 'email', utm_source: 's' },
};

describe('DTO minimal validation', () => {
  it('parses CampaignId', () => {
    expect(parseCampaignId({ id: '42', extra: 'ignored' }).id).toBe('42');
  });

  it('parses CheckCredentials', () => {
    const dto = parseCheckCredentials({ k: 'a', r: 'b', u: 'c' });
    expect(dto).toEqual({ k: 'a', r: 'b', u: 'c' });
  });

  it('parses EmailValidator', () => {
    expect(parseEmailValidator({ email: 'a@b.com' }).email).toBe('a@b.com');
  });

  it('parses SaveOrder', () => {
    expect(parseSaveOrder(saveOrder).number).toBe(1);
  });

  it('parses CreateCampaign nested', () => {
    expect(parseCreateCampaign(campaignNested).type).toBe('email');
  });
});
