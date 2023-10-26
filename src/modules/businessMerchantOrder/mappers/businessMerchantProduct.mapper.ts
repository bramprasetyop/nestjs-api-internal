import { BusinessMerchantProductModel } from '@wahyoo/wahyoo-shared';
import { BusinessMerchantProduct } from '../dto/businessMerchantProduct.dto';

export class BusinessMerchantProductMapper {
  public static modelToDTO(
    model: BusinessMerchantProductModel
  ): BusinessMerchantProduct {
    return new BusinessMerchantProduct(model);
  }

  public static modelsToDTOs(
    models: BusinessMerchantProductModel[]
  ): BusinessMerchantProduct[] {
    return models.map(model => BusinessMerchantProductMapper.modelToDTO(model));
  }
}
