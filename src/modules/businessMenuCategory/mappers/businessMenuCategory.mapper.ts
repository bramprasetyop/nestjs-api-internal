import { BusinessMenuCategoryModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuCategory } from '../dto/businessMenuCategory.dto';

export class BusinessMenuCategoryMapper {
  public static modelToDTO(
    model: BusinessMenuCategoryModel
  ): BusinessMenuCategory {
    return new BusinessMenuCategory(model);
  }

  public static modelsToDTOs(
    models: BusinessMenuCategoryModel[]
  ): BusinessMenuCategory[] {
    return models.map(model => BusinessMenuCategoryMapper.modelToDTO(model));
  }
}
