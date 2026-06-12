import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseEmailValidator, emailValidatorToApiPayload } from '../dto/subscribers/emailValidator';
import { parseManageLoyaltyPoints, manageLoyaltyPointsToApiPayload } from '../dto/loyalty/manageLoyaltyPoints';

export class LoyaltyApi extends AbstractApi 
{
  async getInfo(email: string): Promise<GatewayJsonResult> {
    const dto = parseEmailValidator({ email });
    return this.context.rest.get('/loyalty_info', toGatewayQuery(emailValidatorToApiPayload(dto)));
  }

  async managePoints(email: string, action: string, points: number): Promise<GatewayJsonResult> {
    const dto = parseManageLoyaltyPoints({ email, action, points });
    return this.context.rest.post('/manage_loyalty_points', manageLoyaltyPointsToApiPayload(dto));
  }
}
