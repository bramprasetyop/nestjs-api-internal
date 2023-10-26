import { ProvinceModel } from '@wahyoo/wahyoo-shared';
import { Province } from '../dto/province.dto';

export class ProvinceMapper {
  public static modelToDTO(model: ProvinceModel): Province {
    return new Province(model);
  }

  public static modelsToDTOs(models: ProvinceModel[]): Province[] {
    return models.map(model => ProvinceMapper.modelToDTO(model));
  }
}
