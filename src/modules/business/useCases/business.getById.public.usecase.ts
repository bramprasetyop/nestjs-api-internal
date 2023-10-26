import { Business } from '../dto/business.dto';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMapper } from '../mappers/business.mapper';
import { BusinessRepository } from '../repositories/business.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BusinessGetByIdPublicUseCase implements IUseCase {
  constructor(private readonly repository: BusinessRepository) {}
  async execute(id: string): Promise<Business> {
    const businessModel = await this.repository.findByIdIsHiddenToPublic(id);
    if (!businessModel) {
      throw new NotFoundException(id);
    }
    return BusinessMapper.modelToDTO(businessModel);
  }
}
