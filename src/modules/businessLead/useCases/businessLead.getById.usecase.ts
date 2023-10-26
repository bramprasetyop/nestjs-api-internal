import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessLeadRepository } from '../repositories/businessLead.repository';
import { BusinessLeadMapper } from '../mappers/businessLead.mapper';
import { BusinessLead } from '../dto/businessLead.dto';

@Injectable()
export class BusinessLeadGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: BusinessLeadRepository) {}
  async execute(id: string): Promise<BusinessLead> {
    const businessLeadModel = await this.repository.findById(id);
    if (!businessLeadModel) {
      throw new NotFoundException(id);
    }
    return BusinessLeadMapper.modelToDTO(businessLeadModel);
  }
}
