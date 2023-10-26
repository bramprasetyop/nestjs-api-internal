import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessLeadGetListRequest } from '../dto/businessLeadGetListRequest.dto';
import { BusinessLeadListResponse } from '../dto/businessLeadResponse.dto';
import { BusinessLeadMapper } from '../mappers/businessLead.mapper';
import { BusinessLeadRepository } from '../repositories/businessLead.repository';

@Injectable()
export class BusinessLeadGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessLeadRepository) {}
  async execute(
    dto: BusinessLeadGetListRequest
  ): Promise<BusinessLeadListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessLeadListResponse = {
      totalUncompleted: result.totalUncompleted,
      businessLeads: BusinessLeadMapper.modelsToDTOs(result.businessLeads),
      meta: { ...result.meta }
    };
    return response;
  }
}
