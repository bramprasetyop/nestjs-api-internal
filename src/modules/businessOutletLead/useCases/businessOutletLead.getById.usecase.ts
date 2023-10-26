import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletLead } from '../dto/businessOutletLead.dto';
import { BusinessOutletLeadMapper } from '../mappers/businessOutletLead.mapper';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';

@Injectable()
export class BusinessOutletLeadGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: BusinessOutletLeadRepository) {}

  async execute(businessOutletLeadId: string): Promise<BusinessOutletLead> {
    const businessOutletLeadModel = await this.repository.findById(
      businessOutletLeadId
    );
    if (!businessOutletLeadModel) {
      throw new NotFoundException(businessOutletLeadId);
    }
    const businessOutletLeadDto = BusinessOutletLeadMapper.modelToDTO(
      businessOutletLeadModel
    );
    return businessOutletLeadDto;
  }
}
