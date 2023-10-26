import { BusinessPromosModel } from '@wahyoo/wahyoo-shared';
import { BusinessPromo } from '../dto/businessPromo.dto';

export class BusinessPromoMapper {
  public static modelToDTO(model: BusinessPromosModel): BusinessPromo {
    return new BusinessPromo(model);
  }

  public static modelsToDTOs(models: BusinessPromosModel[]): BusinessPromo[] {
    return models.map(model => BusinessPromoMapper.modelToDTO(model));
  }
}
