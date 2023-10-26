import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessPromoRepository } from '../repositories/businessPromo.repository';
import { BusinessPromoMapper } from '../mappers/businessPromo.mapper';
import { BusinessPromo } from '../dto/businessPromo.dto';

@Injectable()
export class BusinessPromoGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: BusinessPromoRepository) {}
  async execute(id: string): Promise<BusinessPromo> {
    const businessPromosModel = await this.repository.findById(id);
    if (!businessPromosModel) {
      throw new NotFoundException(id);
    }
    return BusinessPromoMapper.modelToDTO(businessPromosModel);
  }
}
