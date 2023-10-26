import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessSalesChannelMenuItemModel,
  BusinessSalesChannelMenuItemStatus
} from '@wahyoo/wahyoo-shared';
import { InjectionKey } from '@wahyoo/wahyoo-shared';
import { Op, QueryTypes } from 'sequelize';
import {
  findByFieldsArgs,
  IBusinessSalesChannelMenuItemRepository
} from './businessSalesChannelMenuItem.interface';

@Injectable()
export class BusinessSalesChannelMenuItemRepository
  implements IBusinessSalesChannelMenuItemRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_MENU_ITEM_MODEL)
    private readonly businessSalesChannelMenuItemModel: typeof BusinessSalesChannelMenuItemModel
  ) {}

  public async findById(
    id: string
  ): Promise<BusinessSalesChannelMenuItemModel> {
    return this.businessSalesChannelMenuItemModel.findByPk(id);
  }

  public async findByMenuItemIds(
    ids: string[]
  ): Promise<BusinessSalesChannelMenuItemModel[]> {
    return await this.businessSalesChannelMenuItemModel.findAll({
      where: {
        businessMenuItemId: {
          [Op.in]: ids
        }
      }
    });
  }
  public async findByBusinessSalesChannelIds(
    ids: string[]
  ): Promise<BusinessSalesChannelMenuItemModel[]> {
    return this.businessSalesChannelMenuItemModel.findAll({
      where: {
        businessSalesChannelId: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByFields(
    args: findByFieldsArgs
  ): Promise<BusinessSalesChannelMenuItemModel> {
    return this.businessSalesChannelMenuItemModel.findOne({
      where: { ...args }
    });
  }

  async findTotalActiveChannelByMenuItemIds(ids: string[]): Promise<any[]> {
    const stringConcat = `'${ids.join("','")}'`;
    const sequelize = this.businessSalesChannelMenuItemModel.sequelize;
    return sequelize.query(
      `SELECT business_menu_item_id as "businessMenuItemId", count(id) as total FROM business_sales_channel_menu_items where status='${BusinessSalesChannelMenuItemStatus.active}' and business_menu_item_id in (${stringConcat}) and deleted_at is null group by "businessMenuItemId"`,
      { type: QueryTypes.SELECT }
    );
  }
}
