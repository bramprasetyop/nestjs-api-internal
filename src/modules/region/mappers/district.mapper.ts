import { DistrictModel } from '@wahyoo/wahyoo-shared';
import { District } from '../dto/district.dto';

export class DistrictMapper {
  public static modelToDTO(model: DistrictModel): District {
    return new District(model);
  }

  public static modelsToDTOs(models: DistrictModel[]): District[] {
    return models.map(model => DistrictMapper.modelToDTO(model));
  }
}
