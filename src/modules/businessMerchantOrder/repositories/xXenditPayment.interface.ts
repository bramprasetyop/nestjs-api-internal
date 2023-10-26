import { XXenditPaymentModel } from '@wahyoo/wahyoo-shared';

export interface IXXenditPaymentRepository {
  findByBusinessMerchantOrderPaymentIds(
    businessMerchantOrderPaymentIds: string[]
  ): Promise<XXenditPaymentModel[]>;
}
