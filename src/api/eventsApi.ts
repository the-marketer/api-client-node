import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseCustomEvent, customEventToApiPayload } from '../dto/events/customEvent';
import { parseInitiateCheckoutEvent, initiateCheckoutEventToApiPayload } from '../dto/events/initiateCheckoutEvent';
import { parseProductLineEvent, productLineEventToApiPayload } from '../dto/events/productLineEvent';
import { parseSearchEvent, searchEventToApiPayload } from '../dto/events/searchEvent';
import { parseSendCustomEvent, sendCustomEventToApiPayload } from '../dto/events/sendCustomEvent';
import { parseServeJavascriptEvent, serveJavascriptEventToApiPayload } from '../dto/events/serveJavascriptEvent';
import { parseSetEmailEvent, setEmailEventToApiPayload } from '../dto/events/setEmailEvent';
import { parseViewHomepageEvent, viewHomepageEventToApiPayload } from '../dto/events/viewHomepageEvent';
import { parseViewProductEvent, viewProductEventToApiPayload } from '../dto/events/viewProductEvent';

export class EventsApi extends AbstractApi 
{
  async sendCustomApi(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSendCustomEvent(payload);
    return this.context.rest.post('/custom_events', sendCustomEventToApiPayload(dto));
  }

  async sendCustom(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseCustomEvent(payload);
    return this.context.tracking.post('/t/r', customEventToApiPayload(dto));
  }

  async viewHomepage(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseViewHomepageEvent(payload);
    return this.context.tracking.post('/t/r', viewHomepageEventToApiPayload(dto));
  }

  async setEmail(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSetEmailEvent(payload);
    return this.context.tracking.post('/t/r', setEmailEventToApiPayload(dto));
  }

  async viewProduct(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseViewProductEvent(payload);
    return this.context.tracking.post('/t/r', viewProductEventToApiPayload(dto));
  }

  async addToCart(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseProductLineEvent(payload);
    return this.context.tracking.post('/t/r', productLineEventToApiPayload(dto));
  }

  async removeFromCart(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseProductLineEvent(payload);
    return this.context.tracking.post('/t/r', productLineEventToApiPayload(dto));
  }

  async addToWishlist(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseProductLineEvent(payload);
    return this.context.tracking.post('/t/r', productLineEventToApiPayload(dto));
  }

  async removeFromWishlist(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseProductLineEvent(payload);
    return this.context.tracking.post('/t/r', productLineEventToApiPayload(dto));
  }

  async initiateCheckout(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseInitiateCheckoutEvent(payload);
    return this.context.tracking.post('/t/r', initiateCheckoutEventToApiPayload(dto));
  }

  async search(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSearchEvent(payload);
    return this.context.tracking.post('/t/r', searchEventToApiPayload(dto));
  }

  async serveJavascript(trackingKey: string): Promise<GatewayJsonResult> {
    const dto = parseServeJavascriptEvent({ k: trackingKey });
    return this.context.tracking.get(`/t/j/${trackingKey}`, toGatewayQuery(serveJavascriptEventToApiPayload(dto)));
  }

}
