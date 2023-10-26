import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { XHubsterItem } from '../dto/xHubsterItem';
import { XHubsterItemAssignBusinessMenuItemRequest } from '../dto/xHubsterItemAssignBusinessMenuItemRequest.dto';
import { XHubsterItemMapper } from '../mappers/xHubsterItem.mapper';
import { XHubsterItemRepository } from '../repositories/xHubsterItem.repository';

@Injectable()
export class XHubsterItemAssignBusinessMenuItemUseCase implements IUseCase {
  constructor(
    private readonly xHubsterItemRepository: XHubsterItemRepository
  ) {}

  async execute(
    requestDTO: XHubsterItemAssignBusinessMenuItemRequest[]
  ): Promise<XHubsterItem[]> {
    const promises = [];
    requestDTO.forEach(request => {
      promises.push(this.xHubsterItemRepository.update(request));
    });

    const result = await Promise.all(promises);

    return XHubsterItemMapper.modelsToDTOs(result.map(x => x[0]));
  }
}
