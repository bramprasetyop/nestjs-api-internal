import { BusinessMerchantOrderModel } from '@wahyoo/wahyoo-shared';
import { BusinessMerchantOrder } from '../dto/businessMerchantOrder.dto';

export class BusinessMerchantOrderMapper {
  public static modelToDTO(
    model: BusinessMerchantOrderModel
  ): BusinessMerchantOrder {
    return new BusinessMerchantOrder(model);
  }

  public static modelsToDTOs(
    models: BusinessMerchantOrderModel[]
  ): BusinessMerchantOrder[] {
    return models.map(model => BusinessMerchantOrderMapper.modelToDTO(model));
  }
}
