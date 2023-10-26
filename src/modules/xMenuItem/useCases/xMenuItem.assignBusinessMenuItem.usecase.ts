import { XMenuItem } from './../dto/xMenuItem.dto';
import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { XMenuItemAssignBusinessMenuItemRequest } from '../dto/xMenuItemAssignBusinessMenuItemRequest.dto';
import { XMenuItemRepository } from '../repositories/xMenuItem.repository';

@Injectable()
export class XMenuItemAssignBusinessMenuItemUseCase implements IUseCase {
  constructor(private readonly xMenuItemRepository: XMenuItemRepository) {}

  async execute(
    requestDTO: XMenuItemAssignBusinessMenuItemRequest[]
  ): Promise<XMenuItem[]> {
    const promises = [];
    requestDTO.forEach(request => {
      promises.push(this.xMenuItemRepository.update(request));
    });

    const result = await Promise.all(promises);

    return result;
  }
}
