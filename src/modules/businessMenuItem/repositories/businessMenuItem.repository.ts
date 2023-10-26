import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessMenuItemModifierStatus,
  BusinessSalesChannelMenuItemModel,
  XHubsterItemModel,
  XKlikitItemModel
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemModifierModel } from '@wahyoo/wahyoo-shared';
import { InjectionKey, BusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { BusinessMenuItemCreateRequest } from '../dto/businessMenuItemCreateRequest.dto';
import { BusinessMenuItemGetListRequest } from '../dto/businessMenuItemGetListRequest.dto';
import { BusinessMenuItemUpdateRequest } from '../dto/businessMenuItemUpdateRequest.dto';
import {
  IBusinessMenuItemRepository,
  PagingBusinessMenuItemModel
} from './businessMenuItem.interface';

@Injectable()
export class BusinessMenuItemRepository implements IBusinessMenuItemRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MENU_ITEM_MODEL)
    private readonly businessMenuItemModel: typeof BusinessMenuItemModel,
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_MENU_ITEM_MODEL)
    private readonly businessSalesChannelMenuItemModel: typeof BusinessSalesChannelMenuItemModel,
    @Inject(InjectionKey.BUSINESS_MENU_ITEM_MODIFIER_MODEL)
    private readonly businessMenuItemModifierModel: typeof BusinessMenuItemModifierModel,
    @Inject(InjectionKey.X_HUBSTER_ITEM_MODEL)
    private readonly xHubsterItemModel: typeof XHubsterItemModel,
    @Inject(InjectionKey.X_KLIKIT_ITEM_MODEL)
    private readonly xKlikitItemModel: typeof XKlikitItemModel
  ) {}

  public async findAll(
    dto: BusinessMenuItemGetListRequest
  ): Promise<PagingBusinessMenuItemModel> {
    const { sortBy, page, pageSize, filter, search, disabledPagination } = dto;
    const whereClause: any = {};
    let includeClause: any = [];
    if (filter && Object.keys(filter).length > 0) {
      if (filter.id) {
        whereClause.id = filter.id;
      }
      if (filter.businessMenuCategoryId) {
        whereClause.businessMenuCategoryId = filter.businessMenuCategoryId;
      }
      if (filter.businessId) {
        whereClause.businessId = filter.businessId;
      }
      if (filter.name) {
        whereClause.name = filter.name;
      }
      if (filter.maxPriceBase) {
        whereClause.maxPriceBase = filter.maxPriceBase;
      }
      if (filter.isUnassignedToHubsterItem === true) {
        // will generate sql : "xHubsterItem" is null
        whereClause['$xHubsterItem$'] = null;
        includeClause = [
          {
            required: false,
            model: XHubsterItemModel
          }
        ];
      }
      if (filter.isUnassignedToKlikitItem === true) {
        // will generate sql : "xKlikitItem" is null
        whereClause['$xKlikitItem$'] = null;
        includeClause = [
          {
            required: false,
            model: XKlikitItemModel
          }
        ];
      }

      if (filter.startDate || filter.endDate) {
        whereClause[Op.and] = [];
        if (filter.startDate) {
          whereClause[Op.and].push({
            createdAt: { [Op.gte]: filter.startDate }
          });
        }
        if (filter.endDate) {
          whereClause[Op.and].push({
            createdAt: { [Op.lte]: filter.endDate }
          });
        }
      }
    }

    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }
    const result = await this.businessMenuItemModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: disabledPagination ? undefined : pageSize,
      offset: disabledPagination ? undefined : pageSize * page,
      include: includeClause
    });
    return {
      businessMenuItems: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(id: string): Promise<BusinessMenuItemModel> {
    return await this.businessMenuItemModel.findByPk(id);
  }

  public async findBySlug(
    slug: string,
    transaction: any = null
  ): Promise<BusinessMenuItemModel> {
    return await this.businessMenuItemModel.findOne({
      where: { slug },
      transaction,
      paranoid: false
    });
  }

  public async findByIds(ids: string[]): Promise<BusinessMenuItemModel[]> {
    return await this.businessMenuItemModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByMenuCategoryIds(
    ids: string[]
  ): Promise<BusinessMenuItemModel[]> {
    return await this.businessMenuItemModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async create(
    dto: BusinessMenuItemCreateRequest
  ): Promise<BusinessMenuItemModel> {
    const {
      businessSalesChannelMenuItems,
      businessMenuItemModifiers,
      name,
      xHubsterItemIds,
      xKlikitItemIds,
      businessId
    } = dto;
    let transaction;
    try {
      transaction = await this.businessMenuItemModel.sequelize.transaction();
      let slug = name.replace(/[^a-zA-Z0-9]/g, '-');
      let check = await this.findBySlug(slug, transaction);
      while (check) {
        slug = name.replace(/[^a-zA-Z0-9]/g, '-');
        slug += `-${Math.random()
          .toString(36)
          .substr(2, 4)}`;
        check = await this.findBySlug(slug, transaction);
      }
      const menuItem = await this.businessMenuItemModel.create<
        BusinessMenuItemModel
      >({ ...dto, slug }, { transaction });

      if (xHubsterItemIds.length) {
        for (let c = 0; c < xHubsterItemIds.length; c++) {
          const xHubsterItemId = xHubsterItemIds[c];
          const xHubsterId = await this.xHubsterItemModel.findOne({
            where: {
              id: xHubsterItemId,
              businessMenuItemId: null
            }
          });
          if (xHubsterId) {
            await xHubsterId.update(
              {
                businessMenuItemId: menuItem.id,
                businessId
              },
              { transaction }
            );
          }
        }
      }

      if (xKlikitItemIds.length) {
        for (let c = 0; c < xKlikitItemIds.length; c++) {
          const xKlikitItemId = xKlikitItemIds[c];
          const xKlikitId = await this.xKlikitItemModel.findOne({
            where: {
              id: xKlikitItemId,
              businessMenuItemId: null
            }
          });
          if (xKlikitId) {
            await xKlikitId.update(
              {
                businessMenuItemId: menuItem.id,
                businessId
              },
              { transaction }
            );
          }
        }
      }
      const salesChannelPromises: any[] = businessSalesChannelMenuItems.map(
        data => {
          return this.businessSalesChannelMenuItemModel.create(
            {
              ...data,
              businessMenuItemId: menuItem.id
            },
            { transaction }
          );
        }
      );
      await Promise.all(salesChannelPromises);
      const menuModifierPromises: any[] = businessMenuItemModifiers.map(
        data => {
          data.status = BusinessMenuItemModifierStatus.active;
          return this.businessMenuItemModifierModel.create(
            {
              ...data,
              businessMenuItemId: menuItem.id
            },
            { transaction }
          );
        }
      );
      await Promise.all(menuModifierPromises);
      await transaction.commit();
      return menuItem;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async update(
    dto: BusinessMenuItemUpdateRequest
  ): Promise<BusinessMenuItemModel> {
    const {
      id,
      businessSalesChannelMenuItems,
      businessMenuItemModifiers,
      name,
      xHubsterItemIds,
      xKlikitItemIds
    } = dto;
    const businessMenuItem = await this.findById(id);
    // mutate sales channel
    const existingSalesChannelIds = businessSalesChannelMenuItems
      .filter(data => data.id)
      .map(data => data.id);
    let transaction;
    try {
      transaction = await this.businessMenuItemModel.sequelize.transaction();
      let slug = name.replace(/[^a-zA-Z0-9]/g, '-');
      let check = await this.businessMenuItemModel.findOne({
        where: { slug, id: { [Op.ne]: id } },
        paranoid: false,
        transaction
      });
      while (check) {
        slug = name.replace(/[^a-zA-Z0-9]/g, '-');
        slug += `-${Math.random()
          .toString(36)
          .substr(2, 4)}`;
        check = await this.businessMenuItemModel.findOne({
          where: { slug, id: { [Op.ne]: id } },
          paranoid: false,
          transaction
        });
      }
      if (xHubsterItemIds.length) {
        for (let c = 0; c < xHubsterItemIds.length; c++) {
          const xHubsterItemId = xHubsterItemIds[c];
          const xHubsterId = await this.xHubsterItemModel.findByPk(
            xHubsterItemId
          );
          if (xHubsterId) {
            await xHubsterId.update(
              { businessMenuItemId: id },
              { transaction }
            );
          }
        }
      }
      const prevXHubsterIds = await this.xHubsterItemModel.findAll({
        where: {
          businessMenuItemId: id
        }
      });
      const excludedPrevHubsterIds = prevXHubsterIds.filter(
        hubster => !xHubsterItemIds.find(id => id === hubster.id)
      );
      if (excludedPrevHubsterIds.length) {
        for (let c = 0; c < excludedPrevHubsterIds.length; c++) {
          const prevXHubsterId = excludedPrevHubsterIds[c];
          await prevXHubsterId.update(
            {
              businessMenuItemId: null
            },
            { transaction }
          );
        }
      }

      if (xKlikitItemIds.length) {
        for (let c = 0; c < xKlikitItemIds.length; c++) {
          const xKlikitItemId = xKlikitItemIds[c];
          const xKlikitId = await this.xKlikitItemModel.findByPk(xKlikitItemId);
          if (xKlikitId) {
            await xKlikitId.update({ businessMenuItemId: id }, { transaction });
          }
        }
      }
      const prevXKlikitIds = await this.xKlikitItemModel.findAll({
        where: {
          businessMenuItemId: id
        }
      });
      const excludedPrevKlikitIds = prevXKlikitIds.filter(
        klikit => !xKlikitItemIds.find(id => id === klikit.id)
      );
      if (excludedPrevKlikitIds.length) {
        for (let c = 0; c < excludedPrevKlikitIds.length; c++) {
          const prevXKlikitId = excludedPrevKlikitIds[c];
          await prevXKlikitId.update(
            {
              businessMenuItemId: null
            },
            { transaction }
          );
        }
      }
      await this.businessSalesChannelMenuItemModel.destroy({
        where: {
          businessMenuItemId: id,
          id: { [Op.notIn]: existingSalesChannelIds }
        },
        transaction
      });
      const salesChannelPromises: any[] = businessSalesChannelMenuItems.map(
        data => {
          if (!data.id) {
            delete data.id;
          }
          return this.businessSalesChannelMenuItemModel.upsert(
            {
              ...data,
              businessMenuItemId: id
            },
            { transaction }
          );
        }
      );
      await Promise.all(salesChannelPromises);
      // end of mutate sales channel
      // mutate menu modifier
      const existingIds = businessMenuItemModifiers
        .filter(data => data.id)
        .map(data => data.id);
      await this.businessMenuItemModifierModel.destroy({
        where: { businessMenuItemId: id, id: { [Op.notIn]: existingIds } },
        transaction
      });
      const menuModifierPromises: any[] = businessMenuItemModifiers.map(
        data => {
          if (!data.id) {
            delete data.id;
          }
          data.status = BusinessMenuItemModifierStatus.active;
          return this.businessMenuItemModifierModel.upsert(
            {
              ...data,
              businessMenuItemId: id
            },
            { transaction }
          );
        }
      );
      await Promise.all(menuModifierPromises);
      // end of mutate menu modifier
      const updatedData = await businessMenuItem.update(dto, { transaction });
      await transaction.commit();
      return updatedData;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async destroyById(id: string): Promise<boolean> {
    let transaction;
    try {
      transaction = await this.businessMenuItemModel.sequelize.transaction();
      const res = await this.businessMenuItemModel.destroy({
        where: { id },
        transaction
      });
      await this.xHubsterItemModel.update(
        { businessMenuItemId: null },
        {
          where: {
            businessMenuItemId: id
          }
        }
      );
      await this.xKlikitItemModel.update(
        { businessMenuItemId: null },
        {
          where: {
            businessMenuItemId: id
          }
        }
      );
      await this.businessMenuItemModifierModel.destroy({
        where: { businessMenuItemId: id },
        transaction
      });
      await this.businessSalesChannelMenuItemModel.destroy({
        where: { businessMenuItemId: id },
        transaction
      });
      await transaction.commit();
      return res > 0 ? true : false;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async findAllByMenuCategoryId(
    id: string
  ): Promise<BusinessMenuItemModel[]> {
    return await this.businessMenuItemModel.findAll({
      where: { businessMenuCategoryId: id }
    });
  }
}
