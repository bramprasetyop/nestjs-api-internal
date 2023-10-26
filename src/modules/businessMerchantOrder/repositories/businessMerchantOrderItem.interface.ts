import { BusinessMerchantOrderItemModel } from '@wahyoo/wahyoo-shared';

export interface IBusinessMerchantOrderItemRepository {
  findByBusinessMerchantOrderIds(
    businessMerchantOrderIds: string[]
  ): Promise<BusinessMerchantOrderItemModel[]>;
}
