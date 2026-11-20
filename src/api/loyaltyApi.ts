import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseLoyaltyInfo, loyaltyInfoToApiPayload } from '../dto/loyalty/loyaltyInfo';
import { parseManageLoyaltyPoints, manageLoyaltyPointsToApiPayload } from '../dto/loyalty/manageLoyaltyPoints';

export class LoyaltyApi extends AbstractApi 
{
  /** Looks up the contact by `email` or, when no email is given, by `phone`. */
  async getInfo(email?: string | null, phone?: string | null): Promise<GatewayJsonResult> {
    const dto = parseLoyaltyInfo({ email, phone });
    return this.context.rest.get('/loyalty_info', toGatewayQuery(loyaltyInfoToApiPayload(dto)));
  }

  /** Identifies the contact by `email` or, when no email is given, by `phone`. */
  async managePoints(email: string | null, action: string, points: number, phone?: string | null): Promise<GatewayJsonResult> {
    const dto = parseManageLoyaltyPoints({ email, phone, action, points });
    return this.context.rest.post('/manage_loyalty_points', manageLoyaltyPointsToApiPayload(dto));
  }
}
