import { CampaignsApi } from './api/campaignsApi';
import { CredentialsClient } from './api/credentialsClient';
import { CouponsApi } from './api/couponsApi';
import { EventsApi } from './api/eventsApi';
import { LoyaltyApi } from './api/loyaltyApi';
import { MobilePushApi } from './api/mobilePushApi';
import { OrdersApi } from './api/ordersApi';
import { ProductsApi } from './api/productsApi';
import { ReportsApi } from './api/reportsApi';
import { ReviewsApi } from './api/reviewsApi';
import { SubscribersApi } from './api/subscribersApi';
import { TransactionalsApi } from './api/transactionalsApi';
import { ApiContext } from './common/apiContext';
import { Config, type ConfigOptions } from './common/config';
import type { GatewayJsonResult } from './gateways/abstractGateway';

export interface ClientConfig extends Omit<ConfigOptions, 'apiVersion'> {
  maxRetryAttempts?: number;
  fetchFn?: typeof fetch;
}

export class Client {
  private readonly context: ApiContext;
  private readonly subscribersApi: SubscribersApi;
  private readonly ordersApi: OrdersApi;
  private readonly transactionalsApi: TransactionalsApi;
  private readonly productsApi: ProductsApi;
  private readonly campaignsApi: CampaignsApi;
  private readonly loyaltyApi: LoyaltyApi;
  private readonly couponsApi: CouponsApi;
  private readonly reviewsApi: ReviewsApi;
  private readonly mobilePushApi: MobilePushApi;
  private readonly eventsApi: EventsApi;
  private readonly reportsApi: ReportsApi;
  private readonly credentialsClient: CredentialsClient;

  constructor(config: ClientConfig) {
    const configObj = new Config(config);

    this.context = new ApiContext(configObj, config.maxRetryAttempts ?? 1, config.fetchFn);

    this.subscribersApi = new SubscribersApi(this.context);
    this.ordersApi = new OrdersApi(this.context);
    this.transactionalsApi = new TransactionalsApi(this.context);
    this.productsApi = new ProductsApi(this.context);
    this.campaignsApi = new CampaignsApi(this.context);
    this.loyaltyApi = new LoyaltyApi(this.context);
    this.couponsApi = new CouponsApi(this.context);
    this.reviewsApi = new ReviewsApi(this.context);
    this.mobilePushApi = new MobilePushApi(this.context);
    this.eventsApi = new EventsApi(this.context);
    this.reportsApi = new ReportsApi(this.context);
    this.credentialsClient = new CredentialsClient(this.context);
  }

  subscribers(): SubscribersApi {
    return this.subscribersApi;
  }

  orders(): OrdersApi {
    return this.ordersApi;
  }

  transactionals(): TransactionalsApi {
    return this.transactionalsApi;
  }

  products(): ProductsApi {
    return this.productsApi;
  }

  campaigns(): CampaignsApi {
    return this.campaignsApi;
  }

  loyalty(): LoyaltyApi {
    return this.loyaltyApi;
  }

  coupons(): CouponsApi {
    return this.couponsApi;
  }

  reviews(): ReviewsApi {
    return this.reviewsApi;
  }

  mobilePush(): MobilePushApi {
    return this.mobilePushApi;
  }

  events(): EventsApi {
    return this.eventsApi;
  }

  reports(): ReportsApi {
    return this.reportsApi;
  }

  config(): Config {
    return this.context.config;
  }

  async checkCredentials(trackingKey: string): Promise<boolean> {
    const result = await this.credentialsClient.checkCredentials(trackingKey);
    return Array.isArray(result) && result.length === 0;
  }

  async checkApiCredentials(): Promise<boolean> {
    const result = await this.credentialsClient.checkApiCredentials();
    return Array.isArray(result) && result.length === 0;
  }

  async getCosts(): Promise<GatewayJsonResult> {
    return this.credentialsClient.getCosts();
  }

  async getRealtimeVisitors(): Promise<GatewayJsonResult> {
    return this.credentialsClient.getRealtimeVisitors();
  }

  async getSmsCredit(): Promise<GatewayJsonResult> {
    return this.credentialsClient.getSmsCredit();
  }

  async getReferralLink(email?: string | null): Promise<string> {
    return this.credentialsClient.getReferralLink(email);
  }

  async getDeliveryLogs(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    return this.credentialsClient.getDeliveryLogs(payload);
  }

  async getEnteredAutomation(payload: Record<string, unknown>): Promise<GatewayJsonResult> {
    return this.credentialsClient.getEnteredAutomation(payload);
  }
}
