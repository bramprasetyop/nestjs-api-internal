import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { AppVersion } from './dto/appVersion.dto';
import { NestDataLoader } from 'src/commons/loader';
import { AppVersionMapper } from './mappers/appVersion.mapper';
import { AppVersionsModel } from '@wahyoo/wahyoo-shared';
import { AppVersionRepository } from './repositories/appVersion.respository';

@Injectable()
export class AppVersionSingleByIdLoader
  implements NestDataLoader<string, AppVersion> {
  constructor(private readonly repository: AppVersionRepository) {}
  generateDataLoader(): DataLoader<string, AppVersion> {
    return new DataLoader<string, AppVersion>(async keys => {
      const appVersions: AppVersionsModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const appVersionList = AppVersionMapper.modelsToDTOs(appVersions);
      return keys.map(key =>
        appVersionList.find(appVersion => appVersion.id === key)
      );
    });
  }
}
