import { BusinessSalesChannelPaymentTypeModel } from '@wahyoo/wahyoo-shared';

export interface IBusinessSalesChannelPaymentTypeRepository {
  findBySalesChannelIds(
    ids: string[]
  ): Promise<BusinessSalesChannelPaymentTypeModel[]>;
  findByPaymentTypeIds(
    ids: string[]
  ): Promise<BusinessSalesChannelPaymentTypeModel[]>;
}
