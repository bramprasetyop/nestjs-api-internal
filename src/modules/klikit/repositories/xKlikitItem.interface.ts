import { XKlikitItemModel } from '@wahyoo/wahyoo-shared';

export interface IXKlikitItemRepository {
  findByBusinessMenuItemIds(ids: string[]): Promise<XKlikitItemModel[]>;
}
