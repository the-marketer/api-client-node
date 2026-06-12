import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseCheckCredentials, checkCredentialsToApiPayload } from '../dto/credentials/checkCredentials';
import { parseDeliveryLogs, deliveryLogsToApiPayload } from '../dto/credentials/deliveryLogs';
import { parseEnteredAutomation, enteredAutomationToApiPayload } from '../dto/credentials/enteredAutomation';
import { parseReferralLink, referralLinkToApiPayload } from '../dto/credentials/referralLink';

export class CredentialsClient extends AbstractApi 
{
  async checkCredentials(trackingKey: string): Promise<GatewayJsonResult> {
    const dto = parseCheckCredentials({ k: trackingKey, r: this.context.config.restKey, u: this.context.config.customerId });
    return this.context.rest.post('/check-credentials', checkCredentialsToApiPayload(dto));
  }

  async checkApiCredentials(): Promise<GatewayJsonResult> {
    return this.context.rest.post('/check-api-credentials');
  }

  async getCosts(): Promise<GatewayJsonResult> { return this.context.rest.get('/get_costs'); }

  async getRealtimeVisitors(): Promise<GatewayJsonResult> { return this.context.rest.get('/realtime_visitors'); }

  async getSmsCredit(): Promise<GatewayJsonResult> { return this.context.rest.get('/check-sms-credit'); }

  async getReferralLink(email?: string | null): Promise<string> {
    const dto = parseReferralLink({ email });
    return this.context.rest.get('/get-referral-link', toGatewayQuery(referralLinkToApiPayload(dto)), false) as Promise<string>;
  }

  async getDeliveryLogs(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseDeliveryLogs(payload);
    return this.context.rest.get('/delivery-logs', toGatewayQuery(deliveryLogsToApiPayload(dto)));
  }

  async getEnteredAutomation(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseEnteredAutomation(payload);
    return this.context.rest.get('/entered-automation', toGatewayQuery(enteredAutomationToApiPayload(dto)));
  }
  
}
