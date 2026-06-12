import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseCampaignId, campaignIdToApiPayload } from '../dto/campaigns/campaignId';
import { parseCreateCampaign, createCampaignToApiPayload } from '../dto/campaigns/createCampaign';
import { parseLatestCampaign, latestCampaignToApiPayload } from '../dto/campaigns/latestCampaign';
import { parseListCampaign, listCampaignToApiPayload } from '../dto/campaigns/listCampaign';

const CAMPAIGNS_ENDPOINT = '/campaigns';

export class CampaignsApi extends AbstractApi 
{  
  async list(payload: Record<string, unknown> = {}): Promise<GatewayJsonResult> {
    const dto = parseListCampaign(payload);
    return this.context.rest.post(`${CAMPAIGNS_ENDPOINT}/list`, listCampaignToApiPayload(dto));
  }

  async create(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseCreateCampaign(payload);
    return this.context.rest.post(`${CAMPAIGNS_ENDPOINT}/create`, createCampaignToApiPayload(dto));
  }

  async getEmailReport(id: string): Promise<GatewayJsonResult> {
    const dto = parseCampaignId({ id });
    return this.context.rest.get(`${CAMPAIGNS_ENDPOINT}/${dto.id}/email/get-report`, toGatewayQuery(campaignIdToApiPayload(dto)));
  }

  async getLatestCampaign(limit?: number | null): Promise<GatewayJsonResult> {
    const dto = parseLatestCampaign({ limit });
    return this.context.rest.get('/get-latest-campaign', toGatewayQuery(latestCampaignToApiPayload(dto)));
  }

}
