import { Inject } from '@nestjs/common';
import {
  BusinessMenuCategoryModel,
  BusinessSalesChannelMenuCategoryModel,
  BusinessSalesChannelMenuCategoryStatus,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { Op, QueryTypes } from 'sequelize';
import { IBusinessSalesChannelMenuCategoryRepository } from './businessSalesChannelMenuCategory.interface';
export class BusinessSalesChannelMenuCategoryRepository
  implements IBusinessSalesChannelMenuCategoryRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_MENU_CATEGORY_MODEL)
    private readonly businessSalesChannelMenuCategoryModel: typeof BusinessSalesChannelMenuCategoryModel
  ) {}

  async findByBusinessSalesChannelIds(
    ids: string[]
  ): Promise<BusinessSalesChannelMenuCategoryModel[]> {
    return this.businessSalesChannelMenuCategoryModel.findAll({
      where: {
        businessSalesChannelId: {
          [Op.in]: ids
        }
      },
      include: [BusinessMenuCategoryModel]
    });
  }

  async findByBusinessMenuCategoryIds(
    ids: string[]
  ): Promise<BusinessSalesChannelMenuCategoryModel[]> {
    return this.businessSalesChannelMenuCategoryModel.findAll({
      where: {
        businessMenuCategoryId: {
          [Op.in]: ids
        }
      }
    });
  }
  async findTotalActiveChannelByMenuCategoryIds(ids: string[]): Promise<any[]> {
    const stringConcat = `'${ids.join("','")}'`;
    const sequelize = this.businessSalesChannelMenuCategoryModel.sequelize;
    return sequelize.query(
      `SELECT business_menu_category_id as "businessMenuCategoryId", count(id) as total FROM business_sales_channel_menu_categories where status='${BusinessSalesChannelMenuCategoryStatus.active}' and business_menu_category_id in (${stringConcat}) and deleted_at is null group by business_menu_category_id`,
      { type: QueryTypes.SELECT }
    );
  }
}
