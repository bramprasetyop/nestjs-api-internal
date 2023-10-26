import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuItemRepository } from '../repositories/businessMenuItem.repository';
import { BusinessMenuItemMapper } from '../mappers/businessMenuItem.mapper';
import { BusinessMenuItem } from '../dto/businessMenuItem.dto';

@Injectable()
export class BusinessMenuItemGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: BusinessMenuItemRepository) {}
  async execute(id: string): Promise<BusinessMenuItem> {
    const businessMenuItemModel = await this.repository.findById(id);
    if (!businessMenuItemModel) {
      throw new NotFoundException(id);
    }
    return BusinessMenuItemMapper.modelToDTO(businessMenuItemModel);
  }
}
