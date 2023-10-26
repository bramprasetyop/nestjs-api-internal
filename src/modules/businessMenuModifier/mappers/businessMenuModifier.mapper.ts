import { BusinessMenuModifierModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuModifier } from '../dto/businessMenuModifier.dto';

export class BusinessMenuModifierMapper {
  public static modelToDTO(
    model: BusinessMenuModifierModel
  ): BusinessMenuModifier {
    return new BusinessMenuModifier(model);
  }

  public static modelsToDTOs(
    models: BusinessMenuModifierModel[]
  ): BusinessMenuModifier[] {
    return models.map(model => BusinessMenuModifierMapper.modelToDTO(model));
  }
}
