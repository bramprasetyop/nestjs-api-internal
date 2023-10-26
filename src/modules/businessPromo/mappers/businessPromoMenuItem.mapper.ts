import { BusinessPromoMenuItemsModel } from '@wahyoo/wahyoo-shared';
import { BusinessPromoMenuItem } from '../dto/businessPromoMenuItem.dto';

export class BusinessPromoMenuItemMapper {
  public static modelToDTO(
    model: BusinessPromoMenuItemsModel
  ): BusinessPromoMenuItem {
    return new BusinessPromoMenuItem(model);
  }

  public static modelsToDTOs(
    models: BusinessPromoMenuItemsModel[]
  ): BusinessPromoMenuItem[] {
    return models.map(model => BusinessPromoMenuItemMapper.modelToDTO(model));
  }
}
