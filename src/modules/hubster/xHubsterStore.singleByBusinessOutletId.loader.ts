import { Injectable } from '@nestjs/common';
import { XHubsterStoreModel } from '@wahyoo/wahyoo-shared';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/commons/loader';
import { XHubsterStore } from './dto/xHubsterStore';
import { XHubsterStoreMapper } from './mappers/xHubsterStore.mapper';
import { XHubsterStoreRepository } from './repositories/xHubsterStore.repository';

@Injectable()
export class XHubsterStoreSingleByBusinessOutletIdLoader
  implements NestDataLoader<string, XHubsterStore> {
  constructor(private readonly repository: XHubsterStoreRepository) {}
  generateDataLoader(): DataLoader<string, XHubsterStore> {
    return new DataLoader<string, XHubsterStore>(async keys => {
      const xHubsterStoreModels: XHubsterStoreModel[] = await this.repository.findByByBusinessOutletIds(
        keys as string[]
      );
      const xHubsterStores = XHubsterStoreMapper.modelsToDTOs(
        xHubsterStoreModels
      );
      return keys.map(key =>
        xHubsterStores.find(
          xHubsterStore => xHubsterStore.businessOutletId === key
        )
      );
    });
  }
}
