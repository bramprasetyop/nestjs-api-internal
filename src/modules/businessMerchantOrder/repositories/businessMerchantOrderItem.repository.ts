import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessMerchantOrderItemModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IBusinessMerchantOrderItemRepository } from './businessMerchantOrderItem.interface';

@Injectable()
export class BusinessMerchantOrderItemRepository
  implements IBusinessMerchantOrderItemRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MERCHANT_ORDER_ITEM_MODEL)
    private readonly businessMerchantOrderItemModel: typeof BusinessMerchantOrderItemModel
  ) {}
  public async findByBusinessMerchantOrderIds(
    businessMerchantOrderIds: string[]
  ): Promise<BusinessMerchantOrderItemModel[]> {
    return this.businessMerchantOrderItemModel.findAll({
      where: {
        businessMerchantOrderId: {
          [Op.in]: businessMerchantOrderIds
        }
      }
    });
  }
}
