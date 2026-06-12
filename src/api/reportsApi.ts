import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseAudience, audienceToApiPayload } from '../dto/reports/audience';
import { parseEmailReports, emailReportsToApiPayload } from '../dto/reports/emailReports';
import { parseFormsReports, formsReportsToApiPayload } from '../dto/reports/formsReports';
import { parsePushReports, pushReportsToApiPayload } from '../dto/reports/pushReports';
import { parseSmsReports, smsReportsToApiPayload } from '../dto/reports/smsReports';

export class ReportsApi extends AbstractApi 
{
  async getEmailCampaigns(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseEmailReports(payload);
    return this.context.rest.get('/reports/get-email-campaigns', toGatewayQuery(emailReportsToApiPayload(dto)));
  }

  async getEmailAutomation(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseEmailReports(payload);
    return this.context.rest.get('/reports/get-email-automation', toGatewayQuery(emailReportsToApiPayload(dto)));
  }

  async getPushCampaigns(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parsePushReports(payload);
    return this.context.rest.get('/reports/get-push-campaigns', toGatewayQuery(pushReportsToApiPayload(dto)));
  }

  async getPushAutomation(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parsePushReports(payload);
    return this.context.rest.get('/reports/get-push-automation', toGatewayQuery(pushReportsToApiPayload(dto)));
  }

  async getSmsCampaigns(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSmsReports(payload);
    return this.context.rest.get('/reports/get-sms-campaigns', toGatewayQuery(smsReportsToApiPayload(dto)));
  }

  async getSmsAutomation(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSmsReports(payload);
    return this.context.rest.get('/reports/get-sms-automation', toGatewayQuery(smsReportsToApiPayload(dto)));
  }

  async getFormsPopups(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseFormsReports(payload);
    return this.context.rest.get('/reports/get-forms-popups', toGatewayQuery(formsReportsToApiPayload(dto)));
  }

  async getFormsEmbedded(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseFormsReports(payload);
    return this.context.rest.get('/reports/get-forms-embedded', toGatewayQuery(formsReportsToApiPayload(dto)));
  }

  async getAudience(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseAudience(payload);
    return this.context.rest.get('/reports/get-audience', toGatewayQuery(audienceToApiPayload(dto)));
  }
  
}
