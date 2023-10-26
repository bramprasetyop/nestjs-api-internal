import { BusinessMenuItemModifierModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemModifier } from '../dto/businessMenuItemModifier.dto';

export class BusinessMenuItemModifierMapper {
  public static modelToDTO(
    model: BusinessMenuItemModifierModel
  ): BusinessMenuItemModifier {
    return new BusinessMenuItemModifier(model);
  }

  public static modelsToDTOs(
    models: BusinessMenuItemModifierModel[]
  ): BusinessMenuItemModifier[] {
    return models.map(model =>
      BusinessMenuItemModifierMapper.modelToDTO(model)
    );
  }
}
