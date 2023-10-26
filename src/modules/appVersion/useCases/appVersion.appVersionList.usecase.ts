import { IUseCase } from 'src/commons/useCase.interface';
import { AppVersionListRequest } from '../dto/appVersionListRequest.dto';
import { AppVersionListResponse } from '../dto/appVersionListResponse.dto';
import { Injectable } from '@nestjs/common';
import { AppVersionRepository } from '../repositories/appVersion.respository';
import { AppVersionMapper } from '../mappers/appVersion.mapper';

@Injectable()
export class AppVersionGetListUseCase implements IUseCase {
  constructor(private readonly repository: AppVersionRepository) {}
  async execute(dto: AppVersionListRequest): Promise<AppVersionListResponse> {
    const result = await this.repository.findAll(dto);

    const response: AppVersionListResponse = {
      appVersions: AppVersionMapper.modelsToDTOs(result.appVersions),
      meta: { ...result.meta }
    };
    return response;
  }
}
