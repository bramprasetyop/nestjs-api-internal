import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { DistrictGetListRequest } from '../dto/districtGetListRequest.dto';
import { DistrictGetListResponse } from '../dto/districtGetListResponse.dto';
import { DistrictMapper } from '../mappers/district.mapper';
import { DistrictRepository } from '../repositories/district.repository';

@Injectable()
export class DistrictGetListUseCase implements IUseCase {
  constructor(private readonly repository: DistrictRepository) {}
  async execute(dto: DistrictGetListRequest): Promise<DistrictGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: DistrictGetListResponse = {
      districts: DistrictMapper.modelsToDTOs(result.districts),
      meta: { ...result.meta }
    };
    return response;
  }
}
