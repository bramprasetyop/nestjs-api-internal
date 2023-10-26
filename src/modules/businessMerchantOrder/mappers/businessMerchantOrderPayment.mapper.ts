import { BusinessMerchantOrderPaymentModel } from '@wahyoo/wahyoo-shared';
import { BusinessMerchantOrderPayment } from '../dto/businessMerchantOrderPayment.dto';

export class BusinessMerchantOrderPaymentMapper {
  public static modelToDTO(
    model: BusinessMerchantOrderPaymentModel
  ): BusinessMerchantOrderPayment {
    return new BusinessMerchantOrderPayment(model);
  }

  public static modelsToDTOs(
    models: BusinessMerchantOrderPaymentModel[]
  ): BusinessMerchantOrderPayment[] {
    return models.map(model =>
      BusinessMerchantOrderPaymentMapper.modelToDTO(model)
    );
  }
}
