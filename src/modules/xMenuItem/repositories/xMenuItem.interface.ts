import { XMenuItemGetUnassignListRequest } from '../dto/xMenuItemUnassignedListRequest.dto';
import { XMenuItem } from '../dto/xMenuItem.dto';

export interface IXMenuItemRepository {
  getAllUnassignedBusinessMenuItem(
    dto: XMenuItemGetUnassignListRequest
  ): Promise<XMenuItem[]>;
}
