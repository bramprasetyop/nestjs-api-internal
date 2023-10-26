import { XHubsterItemModel } from '@wahyoo/wahyoo-shared';
import { XHubsterStoreGetUnassignListRequest } from '../dto/xHubsterStoreGetUnassignListRequest.dto';

export interface IXHubsterItemRepository {
  getAllUnassignedBusinessMenuItem(
    dto: XHubsterStoreGetUnassignListRequest
  ): Promise<XHubsterItemModel[]>;
  findByBusinessMenuItemIds(ids: string[]): Promise<XHubsterItemModel[]>;
}
