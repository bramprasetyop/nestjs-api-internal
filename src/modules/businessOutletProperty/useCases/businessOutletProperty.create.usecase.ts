import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletProperty } from '../dto/businessOutletProperty.dto';
import { BusinessOutletPropertyCreateRequest } from '../dto/businessOutletPropertyCreateRequest.dto';
import { BusinessOutletPropertyMapper } from '../mappers/businessOutletProperty.mapper';
import { BusinessOutletPropertyRepository } from '../respositories/businessOutletProperty.repository';

@Injectable()
export class BusinessOutletPropertyCreateUseCase implements IUseCase {
  constructor(
    private readonly businessOutletPropertyRepository: BusinessOutletPropertyRepository
  ) {}

  async execute(
    dto: BusinessOutletPropertyCreateRequest
  ): Promise<BusinessOutletProperty> {
    const businessOutletProperty = await this.businessOutletPropertyRepository.findByBusinessOutletId(
      dto.businessOutletId
    );
    if (businessOutletProperty) {
      throw new Error(
        `Business Outlet Property for Outlet ${dto.businessOutletId} already exists`
      );
    }
    const newBusinessOutletProperty = await this.businessOutletPropertyRepository.create(
      dto
    );
    const businessOutletPropertyDto = BusinessOutletPropertyMapper.modelToDTO(
      newBusinessOutletProperty
    );
    return businessOutletPropertyDto;
  }
}
