import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { XHubsterStore } from '../dto/xHubsterStore';
import { XHubsterStoreGetUnassignListRequest } from '../dto/xHubsterStoreGetUnassignListRequest.dto';
import { XHubsterStoreMapper } from '../mappers/xHubsterStore.mapper';
import { XHubsterStoreRepository } from '../repositories/xHubsterStore.repository';

@Injectable()
export class XHubsterStoreGetUnassignedListUseCase implements IUseCase {
  constructor(
    private readonly xHubsterStoreRepository: XHubsterStoreRepository
  ) {}

  async execute(
    requestDTO: XHubsterStoreGetUnassignListRequest
  ): Promise<XHubsterStore[]> {
    const result = await this.xHubsterStoreRepository.getAllUnassignedBusinessOutlet(
      requestDTO
    );

    return XHubsterStoreMapper.modelsToDTOs(result);
  }
}
