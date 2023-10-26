import { BusinessSalesChannelCategoryModel } from '@wahyoo/wahyoo-shared/dist/modules/database/models/businessSalesChannelCategory.model';

export interface IBusinessSyncRepository {
  findAll(businessId: string): Promise<BusinessSalesChannelCategoryModel[]>;
}
