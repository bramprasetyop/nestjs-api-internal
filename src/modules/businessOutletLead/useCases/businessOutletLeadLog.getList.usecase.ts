import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletLeadLogGetListRequest } from '../dto/businessOutletLeadLogGetListRequest.dto';
import { BusinessOutletLeadLogGetListResponse } from '../dto/businessOutletLeadLogGetListResponse.dto';
import { BusinessOutletLeadLogRepository } from '../repositories/businessOutletLeadLog.repository';

@Injectable()
export class BusinessOutletLeadLogGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessOutletLeadLogRepository) {}

  async execute(dto: BusinessOutletLeadLogGetListRequest): Promise<any> {
    const result = await this.repository.findByBusinessOutletLeadId(dto);
    const response: BusinessOutletLeadLogGetListResponse = {
      businessOutletLeadLogs: result.businessOutletLeadLogs,
      meta: { ...result.meta }
    };
    return response;
  }
}
