import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseAddReview, addReviewToApiPayload } from '../dto/reviews/addReview';
import { parseMerchantAddReview, merchantAddReviewToApiPayload } from '../dto/reviews/merchantAddReview';
import { parseMerchantProSettings, merchantProSettingsToApiPayload } from '../dto/merchantPro/merchantProSettings';
import { parseProductReviews, productReviewsToApiPayload } from '../dto/reviews/productReviews';

export class ReviewsApi extends AbstractApi 
{
  async getProductReviews(payload: Record<string, unknown> = {}): Promise<string> {
    const dto = parseProductReviews(payload);
    return this.context.rest.get('/product_reviews', toGatewayQuery(productReviewsToApiPayload(dto)), false) as Promise<string>;
  }
  
  async createReview(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseAddReview(payload);
    return this.context.rest.post('/add_review', addReviewToApiPayload(dto));
  }

  async merchantAddReview(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseMerchantAddReview(payload);
    return this.context.rest.post('/merchant_add_review', merchantAddReviewToApiPayload(dto));
  }

  async merchantProSetting(payload: Record<string, unknown> = {}): Promise<GatewayJsonResult> {
    const dto = parseMerchantProSettings(payload);
    return this.context.rest.post('/merchantpro_settings', merchantProSettingsToApiPayload(dto));
  }
  
}
