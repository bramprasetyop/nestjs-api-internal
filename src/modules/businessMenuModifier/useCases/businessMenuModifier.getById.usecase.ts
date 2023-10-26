import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuModifierRepository } from '../repositories/businessMenuModifier.repository';
import { BusinessMenuModifierMapper } from '../mappers/businessMenuModifier.mapper';
import { BusinessMenuModifier } from '../dto/businessMenuModifier.dto';

@Injectable()
export class BusinessMenuModifierGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: BusinessMenuModifierRepository) {}
  async execute(id: string): Promise<BusinessMenuModifier> {
    const businessModel = await this.repository.findById(id);
    if (!businessModel) {
      throw new NotFoundException(id);
    }
    return BusinessMenuModifierMapper.modelToDTO(businessModel);
  }
}
