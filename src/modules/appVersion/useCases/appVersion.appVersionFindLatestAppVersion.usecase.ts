import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { AppVersionRepository } from '../repositories/appVersion.respository';
import { AppVersionsModel } from '@wahyoo/wahyoo-shared';
import { AppVersion } from '../dto/appVersion.dto';
import { AppVersionMapper } from '../mappers/appVersion.mapper';

@Injectable()
export class AppVersionFindLatestAppVersionUseCase implements IUseCase {
  constructor(private readonly repository: AppVersionRepository) {}
  async execute(): Promise<AppVersion> {
    const appVersionModel: AppVersionsModel = await this.repository.findByLatestAppVersion();
    return AppVersionMapper.modelToDTO(appVersionModel);
  }
}
