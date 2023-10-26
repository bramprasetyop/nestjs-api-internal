import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { VillageGetListRequest } from '../dto/villageGetListRequest.dto';
import { VillageGetListResponse } from '../dto/villageGetListResponse.dto';
import { VillageMapper } from '../mappers/village.mapper';
import { VillageRepository } from '../repositories/village.repository';

@Injectable()
export class VillageGetListUseCase implements IUseCase {
  constructor(private readonly repository: VillageRepository) {}
  async execute(dto: VillageGetListRequest): Promise<VillageGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: VillageGetListResponse = {
      villages: VillageMapper.modelsToDTOs(result.villages),
      meta: { ...result.meta }
    };
    return response;
  }
}
