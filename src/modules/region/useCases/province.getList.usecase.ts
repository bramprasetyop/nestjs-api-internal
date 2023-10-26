import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { ProvinceGetListRequest } from '../dto/provinceGetListRequest.dto';
import { ProvinceGetListResponse } from '../dto/provinceGetListResponse.dto';
import { ProvinceMapper } from '../mappers/province.mapper';
import { ProvinceRepository } from '../repositories/province.repository';

@Injectable()
export class ProvinceGetListUseCase implements IUseCase {
  constructor(private readonly repository: ProvinceRepository) {}
  async execute(dto: ProvinceGetListRequest): Promise<ProvinceGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: ProvinceGetListResponse = {
      provinces: ProvinceMapper.modelsToDTOs(result.provinces),
      meta: { ...result.meta }
    };
    return response;
  }
}
