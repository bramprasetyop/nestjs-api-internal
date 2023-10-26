import { BusinessMerchantOrderPaymentModel } from '@wahyoo/wahyoo-shared';

export interface IBusinessMerchantOrderPaymentRepository {
  findByBusinessMerchantOrderIds(
    businessMerchantOrderIds: string[]
  ): Promise<BusinessMerchantOrderPaymentModel[]>;
}
