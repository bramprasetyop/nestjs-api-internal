import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletQualityControlGetListRequest } from '../dto/businessOutletQualityControlGetListRequest.dto';
import { BusinessOutletQualityControlGetListResponse } from '../dto/businessOutletQualityControlGetListResponse.dto';
import { BusinessOutletQualityControlMapper } from '../mappers/businessOutletQualityControl.mapper';
import { BusinessOutletQualityControlRepository } from '../repositories/businessOutletQualityControl.repository';

@Injectable()
export class BusinessOutletQualityControlGetListUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletQualityControlRepository
  ) {}

  async execute(
    dto: BusinessOutletQualityControlGetListRequest
  ): Promise<BusinessOutletQualityControlGetListResponse> {
    const result = await this.repository.findAll(dto);
    const response: BusinessOutletQualityControlGetListResponse = {
      businessOutletQualityControls: BusinessOutletQualityControlMapper.modelsToDTOs(
        result.businessOutletQualityControls
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
