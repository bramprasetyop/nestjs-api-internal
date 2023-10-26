import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletProperty } from '../dto/businessOutletProperty.dto';
import { BusinessOutletPropertyMapper } from '../mappers/businessOutletProperty.mapper';
import { BusinessOutletPropertyRepository } from '../respositories/businessOutletProperty.repository';

@Injectable()
export class BusinessOutletPropertyGetByBusinessOutletIdUseCase
  implements IUseCase {
  constructor(private readonly repository: BusinessOutletPropertyRepository) {}

  async execute(businessOutletId: string): Promise<BusinessOutletProperty> {
    const businessOutlet = await this.repository.findByBusinessOutletId(
      businessOutletId
    );
    if (!businessOutlet) return null;
    const businessOutletLeadDto = BusinessOutletPropertyMapper.modelToDTO(
      businessOutlet
    );
    return businessOutletLeadDto;
  }
}
