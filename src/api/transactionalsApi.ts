import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseSendEmail, sendEmailToApiPayload } from '../dto/transactionals/sendEmail';
import { parseSendEmailsBulk, sendEmailsBulkToApiPayload } from '../dto/transactionals/sendEmailsBulk';
import { parseSendSms, sendSmsToApiPayload } from '../dto/transactionals/sendSms';

export class TransactionalsApi extends AbstractApi 
{

  async sendEmail(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSendEmail(payload);
    return this.context.rest.post('/transactional/send-email', sendEmailToApiPayload(dto));
  }

  async sendSms(to: string, content: string): Promise<GatewayJsonResult> {
    const dto = parseSendSms({ to, content });
    return this.context.rest.post('/transactional/send-sms', sendSmsToApiPayload(dto));
  }

  async sendEmailAsync(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSendEmail(payload);
    return this.context.rest.post('/transactional/queue-send-email', sendEmailToApiPayload(dto));
  }

  async sendEmailsBulk(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSendEmailsBulk(payload);
    return this.context.rest.post('/transactional/batch-send-email', sendEmailsBulkToApiPayload(dto));
  }
  
}
