import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { AppVersionRepository } from '../repositories/appVersion.respository';
import { AppVersionsModel } from '@wahyoo/wahyoo-shared';
import { AppVersionCreateRequest } from '../dto/appVersionCreateRequest.dto';
import { AppVersion } from '../dto/appVersion.dto';
import { AppVersionMapper } from '../mappers/appVersion.mapper';

@Injectable()
export class AppVersionCreateUseCase implements IUseCase {
  constructor(private readonly repository: AppVersionRepository) {}
  async execute(dto: AppVersionCreateRequest): Promise<AppVersion> {
    const appVersionModel: AppVersionsModel = await this.repository.create(dto);
    return AppVersionMapper.modelToDTO(appVersionModel);
  }
}
