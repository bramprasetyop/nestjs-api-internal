import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessPaymentTypeGetListRequest } from '../dto/businessPaymentTypeGetListRequest.dto';
import { BusinessPaymentTypeGetListResponse } from '../dto/businessPaymentTypeGetListResponse.dto';
import { BusinessPaymentTypeMapper } from '../mappers/businessPaymentType.mapper';
import { BusinessPaymentTypeRepository } from '../repositories/businessPaymentType.repository';

@Injectable()
export class BusinessPaymentTypeGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessPaymentTypeRepository) {}
  async execute(
    dto: BusinessPaymentTypeGetListRequest
  ): Promise<BusinessPaymentTypeGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessPaymentTypeGetListResponse = {
      businessPaymentTypes: BusinessPaymentTypeMapper.modelsToDTOs(
        result.businessPaymentTypes
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
