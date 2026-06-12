import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseSaveOrder, saveOrderToApiPayload } from '../dto/orders/saveOrder';
import { parseSaveOrderRetail, saveOrderRetailToApiPayload } from '../dto/orders/saveOrderRetail';
import { parseUpdateFeedUrl, updateFeedUrlToApiPayload, type FeedType } from '../dto/orders/updateFeedUrl';
import { parseUpdateOrderStatus, updateOrderStatusToApiPayload } from '../dto/orders/updateOrderStatus';

export class OrdersApi extends AbstractApi 
{
  async updateOrderStatus(orderNumber: string, orderStatus: string): Promise<GatewayJsonResult> {
    const dto = parseUpdateOrderStatus({ order_number: orderNumber, order_status: orderStatus });
    return this.context.rest.get('/update_order_status', toGatewayQuery(updateOrderStatusToApiPayload(dto)));
  }

  async saveOrder(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSaveOrder(payload);
    return this.context.rest.post('/save_order', saveOrderToApiPayload(dto));
  }

  async saveOrderRetail(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSaveOrderRetail(payload);
    return this.context.rest.post('/save_order_retail', saveOrderRetailToApiPayload(dto));
  }

  async updateFeedUrl(url: string, type?: FeedType | null): Promise<GatewayJsonResult> {
    const dto = parseUpdateFeedUrl({ url, type });
    return this.context.rest.post('/update_feed_url', updateFeedUrlToApiPayload(dto));
  }

  async updateOrderFeedUrl(url: string, type?: FeedType | null): Promise<GatewayJsonResult> {
    const dto = parseUpdateFeedUrl({ url, type });
    return this.context.rest.post('/update_order_feed_url', updateFeedUrlToApiPayload(dto));
  }
  
  async getEcommerceStats(): Promise<GatewayJsonResult> { return this.context.rest.get('/get-ecommerce-stats'); }
}
