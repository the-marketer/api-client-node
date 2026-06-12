import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseAddSubscriberBulk, addSubscriberBulkToApiPayload } from '../dto/subscribers/addSubscriberBulk';
import { parseAddSubscriberByPhone, addSubscriberByPhoneToApiPayload } from '../dto/subscribers/addSubscriberByPhone';
import { parseDeleteSubscriber, deleteSubscriberToApiPayload } from '../dto/subscribers/deleteSubscriber';
import { parseEmailValidator, emailValidatorToApiPayload } from '../dto/subscribers/emailValidator';
import { parseListSubscribersDateRange, listSubscribersDateRangeToApiPayload } from '../dto/subscribers/listSubscribersDateRange';
import { parseRemoveSubscriber, removeSubscriberToApiPayload } from '../dto/subscribers/removeSubscriber';
import { parseSubscriberValidator, subscriberValidatorToApiPayload } from '../dto/subscribers/subscriberValidator';
import { parseUnsubscribedEmails, unsubscribedEmailsToApiPayload } from '../dto/subscribers/unsubscribedEmails';
import { parseUpdateTags, updateTagsToApiPayload } from '../dto/subscribers/updateTags';

export class SubscribersApi extends AbstractApi 
{
  async statusSubscriber(email: string): Promise<GatewayJsonResult> {
    const dto = parseEmailValidator({ email });
    return this.context.rest.get('/status_subscriber', toGatewayQuery(emailValidatorToApiPayload(dto)));
  }

  async unsubscribedEmails(dateFrom: string, dateTo: string): Promise<GatewayJsonResult> {
    const dto = parseUnsubscribedEmails({ date_from: dateFrom, date_to: dateTo });
    return this.context.rest.get('/unsubscribed_emails', toGatewayQuery(unsubscribedEmailsToApiPayload(dto)));
  }

  async listUnsubscribed(dateFrom?: string | null, dateTo?: string | null): Promise<GatewayJsonResult> {
    const dto = parseListSubscribersDateRange({ date_from: dateFrom, date_to: dateTo });
    return this.context.rest.get('/unsubscribed_emails', toGatewayQuery(listSubscribersDateRangeToApiPayload(dto)));
  }

  async listSubscribed(dateFrom?: string | null, dateTo?: string | null): Promise<GatewayJsonResult> {
    const dto = parseListSubscribersDateRange({ date_from: dateFrom, date_to: dateTo });
    return this.context.rest.get('/subscribed_emails', toGatewayQuery(listSubscribersDateRangeToApiPayload(dto)));
  }

  async subscribersEvolution(): Promise<GatewayJsonResult> {
    return this.context.rest.get('/subscribers-evolution');
  }

  async addSubscriberAsync(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSubscriberValidator(payload);
    return this.context.rest.post('/add_subscriber', subscriberValidatorToApiPayload(dto));
  }

  async addSubscriberByPhone(phone: string, firstname?: string | null, lastname?: string | null): Promise<GatewayJsonResult> {
    const dto = parseAddSubscriberByPhone({ phone, firstname, lastname });
    return this.context.rest.post('/add_subscriber_by_phone', addSubscriberByPhoneToApiPayload(dto));
  }

  async addSubscriberBulk(subscribers: Record<string, unknown>[]): Promise<GatewayJsonResult> {
    const dto = parseAddSubscriberBulk({ subscribers });
    return this.context.rest.post('/add_subscriber_bulk', addSubscriberBulkToApiPayload(dto));
  }

  async addSubscriber(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSubscriberValidator(payload);
    return this.context.rest.post('/add_subscriber_sync', subscriberValidatorToApiPayload(dto));
  }

  async deleteSubscriber(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseDeleteSubscriber(payload);
    return this.context.rest.post('/delete_subscriber', deleteSubscriberToApiPayload(dto));
  }

  async removeSubscriber(email: string, channels?: string | null): Promise<GatewayJsonResult> {
    const dto = parseRemoveSubscriber({ email, channels });
    return this.context.rest.post('/remove_subscriber', removeSubscriberToApiPayload(dto));
  }

  async anonymizeEmail(email: string): Promise<GatewayJsonResult> {
    const dto = parseEmailValidator({ email });
    return this.context.rest.post('/anonymize-email', emailValidatorToApiPayload(dto));
  }
  
  async updateTags(email: string, addTags: Array<string | number> = [], removeTags: Array<string | number> = [], overwriteExisting?: number | null): Promise<GatewayJsonResult> {
    const dto = parseUpdateTags({ email, add_tags: addTags, remove_tags: removeTags, overwrite_existing: overwriteExisting });
    return this.context.rest.post('/update-tags', updateTagsToApiPayload(dto));
  }
  
}
