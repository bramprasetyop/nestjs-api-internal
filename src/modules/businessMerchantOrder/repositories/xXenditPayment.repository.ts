import { Injectable, Inject } from '@nestjs/common';
import { XXenditPaymentModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IXXenditPaymentRepository } from './xXenditPayment.interface';

@Injectable()
export class XXenditPaymentRepository implements IXXenditPaymentRepository {
  constructor(
    @Inject(InjectionKey.X_XENDIT_PAYMENT_MODEL)
    private readonly xXenditPaymentModel: typeof XXenditPaymentModel
  ) {}
  public async findByBusinessMerchantOrderPaymentIds(
    businessMerchantOrderPaymentIds: string[]
  ): Promise<XXenditPaymentModel[]> {
    return this.xXenditPaymentModel.findAll({
      where: {
        businessMerchantOrderPaymentId: {
          [Op.in]: businessMerchantOrderPaymentIds
        }
      }
    });
  }
}
