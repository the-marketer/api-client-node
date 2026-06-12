import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';

import { parseRemoveMobilePushToken, removeMobilePushTokenToApiPayload } from '../dto/appPush/removeMobilePushToken';
import { parseSetMobilePushToken, setMobilePushTokenToApiPayload } from '../dto/appPush/setMobilePushToken';

export class MobilePushApi extends AbstractApi 
{
  async setToken(email: string, token: string, type: string): Promise<GatewayJsonResult> {
    const dto = parseSetMobilePushToken({ email, token, type });
    return this.context.rest.post('/app-push-notifications/token/set', setMobilePushTokenToApiPayload(dto));
  }

  async removeToken(email: string, type: string): Promise<GatewayJsonResult> {
    const dto = parseRemoveMobilePushToken({ email, type });
    return this.context.rest.post('/app-push-notifications/token/remove', removeMobilePushTokenToApiPayload(dto));
  }
  
}
