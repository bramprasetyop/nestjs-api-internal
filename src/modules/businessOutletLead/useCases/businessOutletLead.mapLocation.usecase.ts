import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';
import { BusinessOutletAndLeadMapLocation } from '../dto/businessOutletAndLeadMapLocation.dto';
import { BusinessOutletAndLeadMapLocationRequest } from '../dto/businessOutletLeadMapLocationRequest.dto';

@Injectable()
export class BusinessOutletLeadMapLocationUseCase implements IUseCase {
  constructor(private readonly repository: BusinessOutletLeadRepository) {}
  async execute(
    dto: BusinessOutletAndLeadMapLocationRequest
  ): Promise<BusinessOutletAndLeadMapLocation[]> {
    return this.repository.getMapLocationBusinessOutletAndLead(dto);
  }
}
