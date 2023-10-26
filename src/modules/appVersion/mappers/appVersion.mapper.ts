import { AppVersionsModel } from '@wahyoo/wahyoo-shared';
import { AppVersion } from '../dto/appVersion.dto';

export class AppVersionMapper {
  public static modelToDTO(model: AppVersionsModel): AppVersion {
    return new AppVersion(model);
  }

  public static modelsToDTOs(models: AppVersionsModel[]): AppVersion[] {
    return models.map(model => AppVersionMapper.modelToDTO(model));
  }
}
