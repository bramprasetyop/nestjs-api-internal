import { BusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuItem } from '../dto/businessMenuItem.dto';

export class BusinessMenuItemMapper {
  public static modelToDTO(model: BusinessMenuItemModel): BusinessMenuItem {
    return new BusinessMenuItem(model);
  }

  public static modelsToDTOs(
    models: BusinessMenuItemModel[]
  ): BusinessMenuItem[] {
    return models.map(model => BusinessMenuItemMapper.modelToDTO(model));
  }
}
