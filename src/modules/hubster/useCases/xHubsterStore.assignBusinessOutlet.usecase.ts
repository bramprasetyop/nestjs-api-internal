import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { XHubsterStore } from '../dto/xHubsterStore';
import { XHubsterStoreAssignBusinessOutletRequest } from '../dto/xHubsterStoreAssignBusinessOutletRequest.dto';
import { XHubsterStoreMapper } from '../mappers/xHubsterStore.mapper';
import { XHubsterStoreRepository } from '../repositories/xHubsterStore.repository';

@Injectable()
export class XHubsterStoreAssignBusinessOutletUseCase implements IUseCase {
  constructor(
    private readonly xHubsterStoreRepository: XHubsterStoreRepository
  ) {}

  async execute(
    requestDTO: XHubsterStoreAssignBusinessOutletRequest[]
  ): Promise<XHubsterStore[]> {
    const promises = [];
    requestDTO.forEach(request => {
      promises.push(
        this.xHubsterStoreRepository.update(request.xHubsterStoreId, {
          isDineIn: request.isDineIn,
          businessOutletId: request.businessOutletId
        })
      );
    });

    const result = await Promise.all(promises);

    return XHubsterStoreMapper.modelsToDTOs(result.map(x => x[0]));
  }
}
