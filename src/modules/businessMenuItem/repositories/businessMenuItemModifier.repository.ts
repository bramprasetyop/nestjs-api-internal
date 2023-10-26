import { Injectable, Inject } from '@nestjs/common';
import { BusinessMenuItemModifierModel } from '@wahyoo/wahyoo-shared';
import { InjectionKey } from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IBusinessMenuItemModifierModelRepository } from './businessMenuItemModifier.interface';

@Injectable()
export class BusinessMenuItemModifierRepository
  implements IBusinessMenuItemModifierModelRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MENU_ITEM_MODIFIER_MODEL)
    private readonly businessMenuItemModifierModel: typeof BusinessMenuItemModifierModel
  ) {}

  public async findByBusinessMenuItemIds(
    ids: string[]
  ): Promise<BusinessMenuItemModifierModel[]> {
    return this.businessMenuItemModifierModel.findAll({
      where: {
        businessMenuItemId: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByBusinessMenuModifierId(
    id: string
  ): Promise<BusinessMenuItemModifierModel[]> {
    return this.businessMenuItemModifierModel.findAll({
      where: {
        businessMenuModifierId: id
      }
    });
  }
}
