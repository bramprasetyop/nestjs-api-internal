import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { XHubsterItem } from '../dto/xHubsterItem';
import { XHubsterItemGetUnassignListRequest } from '../dto/xHubsterItemGetUnassignListRequest.dto';
import { XHubsterStore } from '../dto/xHubsterStore';
import { XHubsterItemMapper } from '../mappers/xHubsterItem.mapper';
import { XHubsterStoreMapper } from '../mappers/xHubsterStore.mapper';
import { XHubsterItemRepository } from '../repositories/xHubsterItem.repository';
import { XHubsterStoreRepository } from '../repositories/xHubsterStore.repository';

@Injectable()
export class XHubsterItemGetUnassignedListUseCase implements IUseCase {
  constructor(
    private readonly xHubsterItemRepository: XHubsterItemRepository
  ) {}

  async execute(
    dto: XHubsterItemGetUnassignListRequest
  ): Promise<XHubsterItem[]> {
    const result = await this.xHubsterItemRepository.getAllUnassignedBusinessMenuItem(
      dto
    );
    return XHubsterItemMapper.modelsToDTOs(result);
  }
}
