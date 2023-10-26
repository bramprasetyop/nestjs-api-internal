import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletLeadGetListRequest } from '../dto/businessOutletLeadGetListRequest.dto';
import { BusinessOutletLeadGetListResponse } from '../dto/businessOutletLeadGetListResponse.dto';
import { BusinessOutletLeadMapper } from '../mappers/businessOutletLead.mapper';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';

@Injectable()
export class BusinessOutletLeadGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessOutletLeadRepository) {}

  async execute(
    dto: BusinessOutletLeadGetListRequest
  ): Promise<BusinessOutletLeadGetListResponse> {
    const result = await this.repository.findAll(dto);
    const response: BusinessOutletLeadGetListResponse = {
      businessOutletLeads: BusinessOutletLeadMapper.modelsToDTOs(
        result.businessOutletLeads
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
