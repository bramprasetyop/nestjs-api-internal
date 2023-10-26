import { BusinessMerchantOrderModel } from '@wahyoo/wahyoo-shared';

export interface IBusinessMerchantOrderRepository {
  findByBusinessOutletLeadIds(
    businessOutletLeadIds: string[]
  ): Promise<BusinessMerchantOrderModel[]>;
  findByIds(ids: string[]): Promise<BusinessMerchantOrderModel[]>;
}
