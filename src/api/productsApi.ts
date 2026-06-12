import { AbstractApi } from '../common/abstractApi';
import type { GatewayJsonResult } from '../gateways/abstractGateway';
import { toGatewayQuery } from '../gateways/abstractGateway';

import { parseCreateProduct, createProductToApiPayload } from '../dto/products/createProduct';
import { parseSyncBrand, syncBrandToApiPayload } from '../dto/products/syncBrand';
import { parseSyncCategory, syncCategoryToApiPayload } from '../dto/products/syncCategory';
import { parseUpdateProduct, updateProductToApiPayload } from '../dto/products/updateProduct';

export class ProductsApi extends AbstractApi 
{
  async createProduct(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseCreateProduct(payload);
    return this.context.rest.post('/product/create', createProductToApiPayload(dto));
  }

  async updateProduct(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseUpdateProduct(payload);
    return this.context.rest.post('/product/update', updateProductToApiPayload(dto));
  }

  async syncCategories(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSyncCategory(payload);
    return this.context.rest.post('/category/upsert', syncCategoryToApiPayload(dto));
  }
  async syncBrands(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    const dto = parseSyncBrand(payload);
    return this.context.rest.post('/brand/upsert', syncBrandToApiPayload(dto));
  }
}
