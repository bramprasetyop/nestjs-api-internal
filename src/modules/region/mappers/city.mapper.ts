import { CityModel } from '@wahyoo/wahyoo-shared';
import { City } from '../dto/city.dto';

export class CityMapper {
  public static modelToDTO(model: CityModel): City {
    return new City(model);
  }

  public static modelsToDTOs(models: CityModel[]): City[] {
    return models.map(model => CityMapper.modelToDTO(model));
  }
}
