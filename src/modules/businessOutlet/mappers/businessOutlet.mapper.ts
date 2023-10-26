import { BusinessOutletModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutlet } from '../dto/businessOutlet.dto';

export class BusinessOutletMapper {
  public static modelToDTO(model: BusinessOutletModel): BusinessOutlet {
    return new BusinessOutlet(model);
  }

  public static modelsToDTOs(models: BusinessOutletModel[]): BusinessOutlet[] {
    return models.map(model => BusinessOutletMapper.modelToDTO(model));
  }
}
