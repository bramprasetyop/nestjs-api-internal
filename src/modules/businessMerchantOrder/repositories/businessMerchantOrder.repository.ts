import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessMerchantOrderModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IBusinessMerchantOrderRepository } from './businessMerchantOrder.interface';

@Injectable()
export class BusinessMerchantOrderRepository
  implements IBusinessMerchantOrderRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MERCHANT_ORDER_MODEL)
    private readonly businessMerchantOrderModel: typeof BusinessMerchantOrderModel
  ) {}
  public async findByIds(ids: string[]): Promise<BusinessMerchantOrderModel[]> {
    return this.businessMerchantOrderModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }
  public async findByBusinessOutletLeadIds(
    businessOutletLeadIds: string[]
  ): Promise<BusinessMerchantOrderModel[]> {
    return this.businessMerchantOrderModel.findAll({
      where: {
        businessOutletLeadId: {
          [Op.in]: businessOutletLeadIds
        }
      }
    });
  }
}
