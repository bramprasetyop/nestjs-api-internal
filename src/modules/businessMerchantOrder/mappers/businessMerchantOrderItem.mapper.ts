import { BusinessMerchantOrderItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMerchantOrderItem } from '../dto/businessMerchantOrderItem.dto';

export class BusinessMerchantOrderItemMapper {
  public static modelToDTO(
    model: BusinessMerchantOrderItemModel
  ): BusinessMerchantOrderItem {
    return new BusinessMerchantOrderItem(model);
  }

  public static modelsToDTOs(
    models: BusinessMerchantOrderItemModel[]
  ): BusinessMerchantOrderItem[] {
    return models.map(model =>
      BusinessMerchantOrderItemMapper.modelToDTO(model)
    );
  }
}
