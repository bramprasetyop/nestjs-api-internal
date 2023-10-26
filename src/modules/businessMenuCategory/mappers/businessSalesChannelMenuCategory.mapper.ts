import { BusinessSalesChannelMenuCategoryModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelMenuCategory } from '../dto/businessSalesChannelMenuCategory.dto';

export class BusinessSalesChannelMenuCategoryMapper {
  public static modelToDTO(
    model: BusinessSalesChannelMenuCategoryModel
  ): BusinessSalesChannelMenuCategory {
    return new BusinessSalesChannelMenuCategory(model);
  }

  public static modelsToDTOs(
    models: BusinessSalesChannelMenuCategoryModel[]
  ): BusinessSalesChannelMenuCategory[] {
    return models.map(model =>
      BusinessSalesChannelMenuCategoryMapper.modelToDTO(model)
    );
  }
}
