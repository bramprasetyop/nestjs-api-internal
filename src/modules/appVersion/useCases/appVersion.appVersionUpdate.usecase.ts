import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { AppVersionRepository } from '../repositories/appVersion.respository';
import { AppVersionsModel } from '@wahyoo/wahyoo-shared';
import { AppVersion } from '../dto/appVersion.dto';
import { AppVersionUpdateRequest } from '../dto/appVersionUpdateRequest.tdo';
import { AppVersionMapper } from '../mappers/appVersion.mapper';

@Injectable()
export class AppVersionUpdateUseCase implements IUseCase {
  constructor(private readonly repository: AppVersionRepository) {}
  async execute(dto: AppVersionUpdateRequest): Promise<AppVersion> {
    const appVersionModel: AppVersionsModel = await this.repository.update(dto);
    return AppVersionMapper.modelToDTO(appVersionModel);
  }
}
