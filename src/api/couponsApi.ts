import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseEmailValidator, emailValidatorToApiPayload } from '../dto/subscribers/emailValidator';
import { parseSaveCoupon, saveCouponToApiPayload } from '../dto/coupons/saveCoupon';

export class CouponsApi extends AbstractApi 
{
  async getAvailableCoupons(email: string): Promise<GatewayJsonResult> {
    const dto = parseEmailValidator({ email });
    return this.context.rest.get('/get_available_coupons', toGatewayQuery(emailValidatorToApiPayload(dto)));
  }

  async save(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSaveCoupon(payload);
    return this.context.rest.post('/save_coupon', saveCouponToApiPayload(dto));
  }
}
