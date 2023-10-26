import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { AppVersionRepository } from '../repositories/appVersion.respository';
import { AppVersionsModel } from '@wahyoo/wahyoo-shared';
import { AppVersionMapper } from '../mappers/appVersion.mapper';
import { AppVersion } from '../dto/appVersion.dto';

@Injectable()
export class AppVersionByIdUseCase implements IUseCase {
  constructor(private readonly repository: AppVersionRepository) {}
  async execute(id: string): Promise<AppVersion> {
    const appVersionModel: AppVersionsModel = await this.repository.findById(
      id
    );
    return AppVersionMapper.modelToDTO(appVersionModel);
  }
}
