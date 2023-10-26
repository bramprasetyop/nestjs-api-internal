import { VillageModel } from '@wahyoo/wahyoo-shared';
import { Village } from '../dto/village.dto';

export class VillageMapper {
  public static modelToDTO(model: VillageModel): Village {
    return new Village(model);
  }

  public static modelsToDTOs(models: VillageModel[]): Village[] {
    return models.map(model => VillageMapper.modelToDTO(model));
  }
}
