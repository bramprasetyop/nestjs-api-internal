import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  BusinessPromosModel,
  BusinessPromoMenuItemsModel,
  BusinessPromoLogModel,
  OrganizationUserModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { BusinessPromoUpdateRequest } from '../dto/businessPromoUpdateRequest.dto';
import { BusinessPromoCreateRequest } from '../dto/businessPromoCreateRequest.dto';
import { BusinessPromoClosedRequest } from '../dto/businessPromoClosedRequest.dto';
import { BusinessPromoGetListRequest } from '../dto/businessPromoGetListRequest.dto';
import {
  IBusinessPromoRepository,
  PagingBusinessPromoModel
} from './businessPromo.interface';

@Injectable()
export class BusinessPromoRepository implements IBusinessPromoRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_PROMOS_MODEL)
    private readonly businessPromosModel: typeof BusinessPromosModel,
    @Inject(InjectionKey.BUSINESS_PROMO_MENU_ITEMS_MODEL)
    private readonly businessPromoMenuItemsModel: typeof BusinessPromoMenuItemsModel,
    @Inject(InjectionKey.BUSINESS_PROMO_LOG_MODEL)
    private readonly businessPromoLogModel: typeof BusinessPromoLogModel
  ) {}

  public async findAll(
    dto: BusinessPromoGetListRequest
  ): Promise<PagingBusinessPromoModel> {
    const { sortBy, page, pageSize, filter, search, disabledPagination } = dto;
    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }

      if (filter.id) {
        whereClause.id = filter.id;
      }
      if (filter.businessId) {
        whereClause.businessId = filter.businessId;
      }
      if (filter.name) {
        whereClause.name = filter.name;
      }

      if (filter.startDate || filter.endDate) {
        whereClause[Op.and] = [];
        if (filter.startDate) {
          whereClause[Op.and].push({
            startDate: { [Op.gte]: filter.startDate }
          });
        }
        if (filter.endDate) {
          whereClause[Op.and].push({
            endDate: { [Op.lte]: filter.endDate }
          });
        }
      }
    }

    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }
    const result = await this.businessPromosModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: disabledPagination ? undefined : pageSize,
      offset: disabledPagination ? undefined : pageSize * page
    });

    return {
      businessPromo: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<BusinessPromosModel[]> {
    return this.businessPromosModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByIdsMenuItem(
    ids: string[]
  ): Promise<BusinessPromoMenuItemsModel[]> {
    return this.businessPromoMenuItemsModel.findAll({
      where: {
        businessPromoId: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findById(id: string): Promise<BusinessPromosModel> {
    return this.businessPromosModel.findOne({
      where: {
        id
      }
    });
  }

  public async create(
    dto: BusinessPromoCreateRequest
  ): Promise<BusinessPromosModel> {
    const { menuItems } = dto;
    let transaction;
    try {
      transaction = await this.businessPromosModel.sequelize.transaction();
      const businessPromo = await this.businessPromosModel.create<
        BusinessPromosModel
      >(dto, { transaction });
      const promises: any[] = menuItems.map(data => {
        return this.businessPromoMenuItemsModel.create(
          {
            ...data,
            businessPromoId: businessPromo.id
          },
          { transaction }
        );
      });

      await this.businessPromoLogModel.create(
        {
          ...dto,
          businessPromoId: businessPromo.id
        },
        {
          transaction
        }
      );

      await Promise.all(promises);
      await transaction.commit();
      return businessPromo;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async update(
    dto: BusinessPromoUpdateRequest
  ): Promise<BusinessPromosModel> {
    const { id, menuItems } = dto;
    const existingBusinessPromo = await this.findById(id);
    const existingIds = menuItems
      .filter(menuItem => menuItem.id)
      .map(menuItem => menuItem.id);
    let transaction;
    try {
      transaction = await this.businessPromosModel.sequelize.transaction();
      await this.businessPromoMenuItemsModel.destroy({
        where: { businessPromoId: id, id: { [Op.notIn]: existingIds } },
        transaction
      });
      const promises: any[] = menuItems.map(menuItem => {
        if (!menuItem.id) {
          delete menuItem.id;
        }
        return this.businessPromoMenuItemsModel.upsert(
          {
            ...menuItem,
            businessPromoId: id
          },
          { transaction }
        );
      });
      await Promise.all(promises);
      const updatedBusinessPromo = await existingBusinessPromo.update(dto, {
        transaction
      });

      delete dto.id;

      await this.businessPromoLogModel.create(
        {
          ...dto,
          businessPromoId: id
        },
        {
          transaction
        }
      );

      await transaction.commit();
      return updatedBusinessPromo;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async closedById(
    dto: BusinessPromoClosedRequest
  ): Promise<BusinessPromosModel> {
    const { id } = dto;
    const existingBusinessPromo = await this.findById(id);
    let transaction;
    try {
      transaction = await this.businessPromosModel.sequelize.transaction();
      const updatedBusinessPromo = await existingBusinessPromo.update(dto, {
        transaction
      });

      await transaction.commit();
      return updatedBusinessPromo;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async destroyById(id: string): Promise<Boolean> {
    const res = await this.businessPromosModel.destroy({
      where: { id }
    });
    return res > 0 ? true : false;
  }
}
