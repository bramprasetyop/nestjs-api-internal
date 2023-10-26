import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { XMenuItem } from '../dto/xMenuItem.dto';
import { XMenuItemGetUnassignListRequest } from '../dto/xMenuItemUnassignedListRequest.dto';
import { XMenuItemRepository } from '../repositories/xMenuItem.repository';

@Injectable()
export class XMenuItemGetUnassignedListUseCase implements IUseCase {
  constructor(private readonly xMenuItemRepository: XMenuItemRepository) {}

  async execute(dto: XMenuItemGetUnassignListRequest): Promise<XMenuItem[]> {
    const result = await this.xMenuItemRepository.getAllUnassignedBusinessMenuItem(
      dto
    );
    return result;
  }
}
