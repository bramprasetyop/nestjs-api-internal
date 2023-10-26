import { BusinessSalesChannelMenuCategoryModel } from '@wahyoo/wahyoo-shared';
export class TotalActiveChannelByMenuCategoryId {
  businessMenuCategoryId: String;
  totalActiveChannel: Number;
}
export interface IBusinessSalesChannelMenuCategoryRepository {
  findByBusinessSalesChannelIds(
    ids: string[]
  ): Promise<BusinessSalesChannelMenuCategoryModel[]>;
  findByBusinessMenuCategoryIds(
    ids: string[]
  ): Promise<BusinessSalesChannelMenuCategoryModel[]>;
  findTotalActiveChannelByMenuCategoryIds(
    ids: string[]
  ): Promise<TotalActiveChannelByMenuCategoryId[]>;
}
