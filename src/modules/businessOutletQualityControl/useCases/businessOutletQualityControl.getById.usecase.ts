import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletQualityControl } from '../dto/businessOutletQualityControl.dto';
import { BusinessOutletQualityControlMapper } from '../mappers/businessOutletQualityControl.mapper';
import { BusinessOutletQualityControlRepository } from '../repositories/businessOutletQualityControl.repository';

@Injectable()
export class BusinessOutletQualityControlGetByIdUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletQualityControlRepository
  ) {}

  async execute(id: string): Promise<BusinessOutletQualityControl> {
    const businessOutletQualityControlModel = await this.repository.findById(
      id
    );
    if (!businessOutletQualityControlModel) {
      throw new NotFoundException(id);
    }
    const businessOutletQualityControlDto = BusinessOutletQualityControlMapper.modelToDTO(
      businessOutletQualityControlModel
    );
    return businessOutletQualityControlDto;
  }
}
