import { BusinessMenuItemModifierModel } from '@wahyoo/wahyoo-shared';

export interface IBusinessMenuItemModifierModelRepository {
  findByBusinessMenuItemIds(
    id: string[]
  ): Promise<BusinessMenuItemModifierModel[]>;
  findByBusinessMenuModifierId(
    id: string
  ): Promise<BusinessMenuItemModifierModel[]>;
}
