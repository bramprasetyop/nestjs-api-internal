import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessSalesChannelCategoryModel,
  BusinessSalesChannelMenuCategoryModel,
  BusinessSalesChannelMenuItemModel,
  BusinessSalesChannelModel,
  BusinessSalesChannelPaymentTypeModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { IBusinessSyncRepository } from './businessSync.interface';

@Injectable()
export class BusinessSyncRepository implements IBusinessSyncRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_CATEGORY_MODEL)
    private readonly businessSalesChannelCategoryModel: typeof BusinessSalesChannelCategoryModel
  ) {}

  async findAll(
    businessId: string
  ): Promise<BusinessSalesChannelCategoryModel[]> {
    return this.businessSalesChannelCategoryModel.findAll({
      where: {
        businessId
      },
      include: [
        {
          model: BusinessSalesChannelModel,
          include: [
            {
              model: BusinessSalesChannelPaymentTypeModel
            },
            {
              model: BusinessSalesChannelMenuCategoryModel
            },
            {
              model: BusinessSalesChannelMenuItemModel
            }
          ]
        }
      ],
      order: [['sequence', 'asc']]
    });
  }
}
