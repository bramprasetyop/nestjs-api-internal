import { Inject, Injectable } from '@nestjs/common';
import {
  InjectionKey,
  SalesOrderBusinessMenuModifierItemModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { SalesOrderBusinessMenuModifierItemInput } from '../dto/salesOrderSyncRequest.dto';
import { ISalesOrderBusinessMenuModifierItemRepository } from './salesOrderBusinessMenuModifierItem.interface';

@Injectable()
export class SalesOrderBusinessMenuModifierItemRepository
  implements ISalesOrderBusinessMenuModifierItemRepository {
  constructor(
    @Inject(InjectionKey.SALES_ORDER_BUSINESS_MENU_MODIFIER_ITEM_MODEL)
    private readonly salesOrderBusinessMenuModifierItemModel: typeof SalesOrderBusinessMenuModifierItemModel
  ) {}
  async findBySalesOrderBusinessMenuItemIds(
    ids: string[]
  ): Promise<SalesOrderBusinessMenuModifierItemModel[]> {
    return this.salesOrderBusinessMenuModifierItemModel.findAll({
      where: {
        salesOrderBusinessMenuItemId: {
          [Op.in]: ids
        }
      }
    });
  }
  public async findById(
    id: string
  ): Promise<SalesOrderBusinessMenuModifierItemModel> {
    return this.salesOrderBusinessMenuModifierItemModel.findByPk(id);
  }
  public async create(
    dto: SalesOrderBusinessMenuModifierItemInput
  ): Promise<SalesOrderBusinessMenuModifierItemModel> {
    return this.salesOrderBusinessMenuModifierItemModel.create(dto);
  }
}
