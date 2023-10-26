import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { CityGetListRequest } from '../dto/cityGetListRequest.dto';
import { CityGetListResponse } from '../dto/cityGetListResponse.dto';
import { CityMapper } from '../mappers/city.mapper';
import { CityRepository } from '../repositories/city.repository';

@Injectable()
export class CityGetListUseCase implements IUseCase {
  constructor(private readonly repository: CityRepository) {}
  async execute(dto: CityGetListRequest): Promise<CityGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: CityGetListResponse = {
      cities: CityMapper.modelsToDTOs(result.cities),
      meta: { ...result.meta }
    };
    return response;
  }
}
