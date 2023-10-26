import { BusinessSalesChannelMenuItemModel } from '@wahyoo/wahyoo-shared';

export interface findByFieldsArgs {
  businessMenuItemId: string;
  businessSalesChannelId: string;
}

export class TotalActiveChannelByMenuItemId {
  businessMenuItemId: String;
  totalActiveChannel: Number;
}
export interface IBusinessSalesChannelMenuItemRepository {
  findById(id: string): Promise<BusinessSalesChannelMenuItemModel>;

  findByMenuItemIds(
    ids: string[]
  ): Promise<BusinessSalesChannelMenuItemModel[]>;
  findByBusinessSalesChannelIds(
    ids: string[]
  ): Promise<BusinessSalesChannelMenuItemModel[]>;
  findByFields(
    args: findByFieldsArgs
  ): Promise<BusinessSalesChannelMenuItemModel>;
  findTotalActiveChannelByMenuItemIds(
    ids: string[]
  ): Promise<TotalActiveChannelByMenuItemId[]>;
}
