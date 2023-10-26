import { XHubsterStoreModel } from '@wahyoo/wahyoo-shared';
import { XHubsterStoreGetUnassignListRequest } from '../dto/xHubsterStoreGetUnassignListRequest.dto';

export interface IXHubsterStoreRepository {
  getAllUnassignedBusinessOutlet(
    dto: XHubsterStoreGetUnassignListRequest
  ): Promise<XHubsterStoreModel[]>;
  findByByBusinessOutletIds(ids: string[]): Promise<XHubsterStoreModel[]>;
}
