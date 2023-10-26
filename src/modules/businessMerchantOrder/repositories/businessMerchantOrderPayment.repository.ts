import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessMerchantOrderPaymentModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IBusinessMerchantOrderPaymentRepository } from './businessMerchantOrderPayment.interface';

@Injectable()
export class BusinessMerchantOrderPaymentRepository
  implements IBusinessMerchantOrderPaymentRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MERCHANT_ORDER_PAYMENT_MODEL)
    private readonly businessMerchantOrderPaymentModel: typeof BusinessMerchantOrderPaymentModel
  ) {}
  public async findByBusinessMerchantOrderIds(
    businessMerchantOrderIds: string[]
  ): Promise<BusinessMerchantOrderPaymentModel[]> {
    return this.businessMerchantOrderPaymentModel.findAll({
      where: {
        businessMerchantOrderId: {
          [Op.in]: businessMerchantOrderIds
        }
      }
    });
  }
}
