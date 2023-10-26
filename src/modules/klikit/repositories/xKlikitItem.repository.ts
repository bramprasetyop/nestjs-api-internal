import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, XKlikitItemModel } from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IXKlikitItemRepository } from './xKlikitItem.interface';

@Injectable()
export class XKlikitItemRepository implements IXKlikitItemRepository {
  constructor(
    @Inject(InjectionKey.X_KLIKIT_ITEM_MODEL)
    private readonly xKlikitItemModel: typeof XKlikitItemModel
  ) {}
  async findByBusinessMenuItemIds(ids: string[]): Promise<XKlikitItemModel[]> {
    return this.xKlikitItemModel.findAll({
      where: {
        businessMenuItemId: {
          [Op.in]: ids
        }
      }
    });
  }
}
