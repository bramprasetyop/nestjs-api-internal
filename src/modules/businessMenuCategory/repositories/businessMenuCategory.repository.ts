import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  BusinessMenuCategoryModel,
  BusinessSalesChannelMenuCategoryModel
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuCategoryGetListRequest } from '../dto/businessMenuCategoryGetListRequest.dto';
import {
  IBusinessMenuCategoryRepository,
  PagingBusinessMenuCategoryModel
} from './businessMenuCategory.interface';
import { BusinessMenuCategoryCreateRequest } from '../dto/businessMenuCategoryCreateRequest.dto';
import { BusinessMenuCategoryUpdateRequest } from '../dto/businessMenuCategoryUpdateRequest.dto';
import { Op } from 'sequelize';

@Injectable()
export class BusinessMenuCategoryRepository
  implements IBusinessMenuCategoryRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MENU_CATEGORY_MODEL)
    private readonly businessMenuCategoryModel: typeof BusinessMenuCategoryModel,
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_MENU_CATEGORY_MODEL)
    private readonly businessSalesChannelMenuCategoryModel: typeof BusinessSalesChannelMenuCategoryModel
  ) {}

  public async findAll(
    dto: BusinessMenuCategoryGetListRequest
  ): Promise<PagingBusinessMenuCategoryModel> {
    const { sortBy, page, pageSize, filter, search } = dto;
    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
      if (filter.id) {
        whereClause.id = filter.id;
      }
      if (filter.parentId) {
        whereClause.parentId = filter.parentId;
      }
      if (filter.name) {
        whereClause.name = filter.name;
      }
      if (filter.isLeaf) {
        whereClause.isLeaf = filter.isLeaf;
      }
      if (filter.isRoot) {
        whereClause.isRoot = filter.isRoot;
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

    const result = await this.businessMenuCategoryModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      businessMenuCategories: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(id: string): Promise<BusinessMenuCategoryModel> {
    return await this.businessMenuCategoryModel.findByPk(id);
  }

  public async findByIds(ids: string[]): Promise<BusinessMenuCategoryModel[]> {
    return await this.businessMenuCategoryModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async create(
    dto: BusinessMenuCategoryCreateRequest
  ): Promise<BusinessMenuCategoryModel> {
    const { businessSalesChannelMenuCategories } = dto;
    let transaction;
    try {
      transaction = await this.businessMenuCategoryModel.sequelize.transaction();
      const businessMenuCategory = await this.businessMenuCategoryModel.create(
        dto,
        { transaction }
      );

      const promises: any[] = businessSalesChannelMenuCategories.map(data => {
        return this.businessSalesChannelMenuCategoryModel.create(
          {
            ...data,
            businessMenuCategoryId: businessMenuCategory.id
          },
          { transaction }
        );
      });

      await Promise.all(promises);
      await transaction.commit();
      return businessMenuCategory;
    } catch (error) {
      await transaction.rollback();
      throw new Error('cannot create menu category');
    }
  }

  public async update(
    dto: BusinessMenuCategoryUpdateRequest
  ): Promise<BusinessMenuCategoryModel> {
    const { id, businessSalesChannelMenuCategories } = dto;
    const businessMenuCategory = await this.findById(id);
    const existingIds = businessSalesChannelMenuCategories
      .filter(businessMenuCategoryItem => businessMenuCategoryItem.id)
      .map(businessMenuCategoryItem => businessMenuCategoryItem.id);
    let transaction;
    try {
      transaction = await this.businessMenuCategoryModel.sequelize.transaction();
      await this.businessSalesChannelMenuCategoryModel.destroy({
        where: { businessMenuCategoryId: id, id: { [Op.notIn]: existingIds } },
        transaction
      });
      const promises: any[] = businessSalesChannelMenuCategories.map(
        businessMenuCategoryItem => {
          if (!businessMenuCategoryItem.id) {
            delete businessMenuCategoryItem.id;
          }
          return this.businessSalesChannelMenuCategoryModel.upsert(
            {
              ...businessMenuCategoryItem,
              businessMenuCategoryId: id
            },
            { transaction }
          );
        }
      );
      await Promise.all(promises);
      await businessMenuCategory.update(dto, { transaction });
      await transaction.commit();
      return businessMenuCategory;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      throw new Error('cannot update menu category');
    }
  }

  public async destroyById(id: string): Promise<boolean> {
    let transaction;
    try {
      transaction = await this.businessMenuCategoryModel.sequelize.transaction();
      const res = await this.businessMenuCategoryModel.destroy({
        where: { id },
        transaction
      });
      await this.businessSalesChannelMenuCategoryModel.destroy({
        where: { businessMenuCategoryId: id },
        transaction
      });
      await transaction.commit();
      return res > 0 ? true : false;
    } catch (error) {
      await transaction.rollback();
      throw new Error('cannot update menu category');
    }
  }
}
