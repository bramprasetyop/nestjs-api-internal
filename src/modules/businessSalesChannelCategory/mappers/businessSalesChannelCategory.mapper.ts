import { BusinessSalesChannelCategoryModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelCategory } from '../dto/businessSalesChannelCategory.dto';

export class BusinessSalesChannelCategoryMapper {
  public static modelToDTO(
    model: BusinessSalesChannelCategoryModel
  ): BusinessSalesChannelCategory {
    return new BusinessSalesChannelCategory(model);
  }

  public static modelsToDTOs(
    models: BusinessSalesChannelCategoryModel[]
  ): BusinessSalesChannelCategory[] {
    return models.map(model =>
      BusinessSalesChannelCategoryMapper.modelToDTO(model)
    );
  }
}
