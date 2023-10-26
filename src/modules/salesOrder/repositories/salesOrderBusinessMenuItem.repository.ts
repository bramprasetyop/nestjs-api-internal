import { Inject, Injectable } from '@nestjs/common';
import {
  InjectionKey,
  SalesOrderBusinessMenuItemModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { SalesOrderBusinessMenuItemInput } from '../dto/salesOrderSyncRequest.dto';
import { ISalesOrderBusinessMenuItemRepository } from './salesOrderBusinessMenuItem.interface';

@Injectable()
export class SalesOrderBusinessMenuItemRepository
  implements ISalesOrderBusinessMenuItemRepository {
  constructor(
    @Inject(InjectionKey.SALES_ORDER_BUSINESS_MENU_ITEM_MODEL)
    private readonly salesOrderBusinessMenuItemModel: typeof SalesOrderBusinessMenuItemModel
  ) {}
  async findBySalesOrderIds(
    ids: string[]
  ): Promise<SalesOrderBusinessMenuItemModel[]> {
    return this.salesOrderBusinessMenuItemModel.findAll({
      where: {
        salesOrderId: {
          [Op.in]: ids
        }
      }
    });
  }
  public async findById(id: string): Promise<SalesOrderBusinessMenuItemModel> {
    return this.salesOrderBusinessMenuItemModel.findByPk(id);
  }
  public async create(
    dto: SalesOrderBusinessMenuItemInput
  ): Promise<SalesOrderBusinessMenuItemModel> {
    return this.salesOrderBusinessMenuItemModel.create(dto);
  }
}
