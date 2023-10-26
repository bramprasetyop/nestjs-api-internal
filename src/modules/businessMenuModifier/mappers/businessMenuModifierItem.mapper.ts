import { BusinessMenuModifierItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuModifierItem } from '../dto/businessMenuModifierItem.dto';

export class BusinessMenuModifierItemMapper {
  public static modelToDTO(
    model: BusinessMenuModifierItemModel
  ): BusinessMenuModifierItem {
    return new BusinessMenuModifierItem(model);
  }

  public static modelsToDTOs(
    models: BusinessMenuModifierItemModel[]
  ): BusinessMenuModifierItem[] {
    return models.map(model =>
      BusinessMenuModifierItemMapper.modelToDTO(model)
    );
  }
}
