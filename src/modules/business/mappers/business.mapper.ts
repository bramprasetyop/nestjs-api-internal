import { BusinessModel } from '@wahyoo/wahyoo-shared';
import { Business } from '../dto/business.dto';

export class BusinessMapper {
  public static modelToDTO(model: BusinessModel): Business {
    return new Business(model);
  }

  public static modelsToDTOs(models: BusinessModel[]): Business[] {
    return models.map(model => BusinessMapper.modelToDTO(model));
  }
}
