import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  BusinessMenuModifierModel,
  BusinessMenuModifierItemModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { BusinessMenuModifierCreateRequest } from '../dto/businessMenuModifierCreateRequest.dto';
import { BusinessMenuModifierUpdateRequest } from '../dto/businessMenuModifierUpdateRequest.dto';
import { BusinessMenuModifierGetListRequest } from '../dto/businessMenuModifierGetListRequest.dto';
import {
  IBusinessMenuModifierRepository,
  PagingBusinessMenuModifierModel
} from './businessMenuModifier.interface';
import { BusinessMenuModifierItem } from '../dto/businessMenuModifierItem.dto';
import { of } from 'rxjs';
import { remove } from 'lodash';

@Injectable()
export class BusinessMenuModifierRepository
  implements IBusinessMenuModifierRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MENU_MODIFIER_MODEL)
    private readonly businessMenuModifierModel: typeof BusinessMenuModifierModel,
    @Inject(InjectionKey.BUSINESS_MENU_MODIFIER_ITEM_MODEL)
    private readonly businessMenuModifierItemModel: typeof BusinessMenuModifierItemModel
  ) {}

  public async findAll(
    dto: BusinessMenuModifierGetListRequest
  ): Promise<PagingBusinessMenuModifierModel> {
    const { sortBy, page, pageSize, filter, search } = dto;
    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
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
    const result = await this.businessMenuModifierModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      businessMenuModifiers: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<BusinessMenuModifierModel[]> {
    return await this.businessMenuModifierModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findById(id: string): Promise<BusinessMenuModifierModel> {
    return await this.businessMenuModifierModel.findByPk(id);
  }

  public async findBySlug(
    slug: string,
    transaction: any = null
  ): Promise<BusinessMenuModifierModel> {
    return await this.businessMenuModifierModel.findOne({
      where: { slug },
      paranoid: false,
      transaction
    });
  }

  public async create(
    dto: BusinessMenuModifierCreateRequest
  ): Promise<BusinessMenuModifierModel> {
    const { businessMenuModifierItems, name } = dto;
    let transaction;
    try {
      transaction = await this.businessMenuModifierModel.sequelize.transaction();
      let slug = name.replace(/[^a-zA-Z0-9]/g, '-');
      let check = await this.findBySlug(slug, transaction);
      while (check) {
        slug = name.replace(/[^a-zA-Z0-9]/g, '-');
        slug += `-${Math.random()
          .toString(36)
          .substr(2, 4)}`;
        check = await this.findBySlug(slug, transaction);
      }

      console.log(slug);

      let modifiedBusinessMenuModifierItems: any[] = businessMenuModifierItems.map(
        data => {
          return { ...data, slug: data.name.replace(/[^a-zA-Z0-9]/g, '-') };
        }
      );

      for (let i = 0; i < modifiedBusinessMenuModifierItems.length; i++) {
        let checkModifierItem = await this.businessMenuModifierItemModel.findOne(
          {
            where: { slug: modifiedBusinessMenuModifierItems[i].slug },
            paranoid: false,
            transaction
          }
        );
        let modifiedBusinessMenuModifierItemSlugs = modifiedBusinessMenuModifierItems.map(
          data => data.slug
        );
        let isInSameList = modifiedBusinessMenuModifierItemSlugs.find(
          (slug, idx) =>
            slug === modifiedBusinessMenuModifierItems[i].slug && idx !== i
        );
        while (checkModifierItem || isInSameList) {
          modifiedBusinessMenuModifierItems[
            i
          ].slug = modifiedBusinessMenuModifierItems[i].name.replace(
            /[^a-zA-Z0-9]/g,
            '-'
          );
          modifiedBusinessMenuModifierItems[i].slug += `-${Math.random()
            .toString(36)
            .substr(2, 4)}`;
          checkModifierItem = await this.businessMenuModifierItemModel.findOne({
            where: { slug: modifiedBusinessMenuModifierItems[i].slug },
            transaction
          });
          modifiedBusinessMenuModifierItemSlugs = modifiedBusinessMenuModifierItems.map(
            data => data.slug
          );
          isInSameList = modifiedBusinessMenuModifierItemSlugs.find(
            (slug, idx) =>
              slug === modifiedBusinessMenuModifierItems[i].slug && idx !== i
          );
        }
      }

      const menuModifier = await this.businessMenuModifierModel.create<
        BusinessMenuModifierModel
      >({ ...dto, slug }, { transaction });
      const businessMenuModifierId = menuModifier.id;
      const businessId = menuModifier.businessId;
      const menuModifierItems = [];
      modifiedBusinessMenuModifierItems.forEach(data => {
        menuModifierItems.push(
          this.businessMenuModifierItemModel.create(
            {
              ...data,
              businessMenuModifierId,
              businessId
            },
            { transaction }
          )
        );
      });

      await Promise.all(menuModifierItems);
      await transaction.commit();
      return menuModifier;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async update(
    dto: BusinessMenuModifierUpdateRequest
  ): Promise<BusinessMenuModifierModel> {
    const { id, businessId, businessMenuModifierItems, name } = dto;
    const businessMenuModifier = await this.findById(id);
    const existingIds = businessMenuModifierItems
      .filter(businessMenuModifierItem => businessMenuModifierItem.id)
      .map(businessMenuModifierItem => businessMenuModifierItem.id);
    let transaction;
    try {
      transaction = await this.businessMenuModifierModel.sequelize.transaction();
      let slug = name.replace(/[^a-zA-Z0-9]/g, '-');
      let check = await this.businessMenuModifierModel.findOne({
        where: { slug, id: { [Op.ne]: id } },
        paranoid: false,
        transaction
      });
      console.log(check);
      while (check) {
        slug = name.replace(/[^a-zA-Z0-9]/g, '-');
        slug += `-${Math.random()
          .toString(36)
          .substr(2, 4)}`;
        check = await this.businessMenuModifierModel.findOne({
          where: { slug, id: { [Op.ne]: id } },
          paranoid: false,
          transaction
        });
      }
      let modifiedBusinessMenuModifierItems: any[] = businessMenuModifierItems.map(
        data => {
          return { ...data, slug: data.name.replace(/[^a-zA-Z0-9]/g, '-') };
        }
      );

      for (let i = 0; i < modifiedBusinessMenuModifierItems.length; i++) {
        let { slug: slugModifierItem, id } = modifiedBusinessMenuModifierItems[
          i
        ];
        let whereClause: any = { slug: slugModifierItem };
        if (id) {
          whereClause.id = { [Op.ne]: id };
        }
        let checkModifierItem = await this.businessMenuModifierItemModel.findOne(
          {
            where: whereClause,
            paranoid: false,
            transaction
          }
        );
        let modifiedBusinessMenuModifierItemSlugs = modifiedBusinessMenuModifierItems.map(
          data => data.slug
        );
        let isInSameList = modifiedBusinessMenuModifierItemSlugs.find(
          (slug, idx) =>
            slug === modifiedBusinessMenuModifierItems[i].slug && idx !== i
        );
        while (checkModifierItem || isInSameList) {
          modifiedBusinessMenuModifierItems[
            i
          ].slug = modifiedBusinessMenuModifierItems[i].name.replace(
            /[^a-zA-Z0-9]/g,
            '-'
          );
          modifiedBusinessMenuModifierItems[i].slug += `-${Math.random()
            .toString(36)
            .substr(2, 4)}`;
          whereClause.slug = modifiedBusinessMenuModifierItems[i].slug;
          checkModifierItem = await this.businessMenuModifierItemModel.findOne({
            where: whereClause,
            transaction
          });
          modifiedBusinessMenuModifierItemSlugs = modifiedBusinessMenuModifierItems.map(
            data => data.slug
          );
          isInSameList = modifiedBusinessMenuModifierItemSlugs.find(
            (slug, idx) =>
              slug === modifiedBusinessMenuModifierItems[i].slug && idx !== i
          );
        }
      }
      await this.businessMenuModifierItemModel.destroy({
        where: { businessMenuModifierId: id, id: { [Op.notIn]: existingIds } },
        transaction
      });
      const promises: any[] = modifiedBusinessMenuModifierItems.map(
        businessMenuModifierItem => {
          if (!businessMenuModifierItem.id) {
            delete businessMenuModifierItem.id;
          }
          return this.businessMenuModifierItemModel.upsert(
            {
              ...businessMenuModifierItem,
              businessId,
              businessMenuModifierId: id
            },
            { transaction }
          );
        }
      );
      await Promise.all(promises);
      const updatedData = await businessMenuModifier.update(
        { ...dto, slug },
        {
          transaction
        }
      );
      await transaction.commit();
      return updatedData;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      throw new Error('cannot create menu modifier');
    }
  }

  public async destroyById(id: string): Promise<Boolean> {
    let transaction;
    try {
      transaction = await this.businessMenuModifierModel.sequelize.transaction();
      const res = await this.businessMenuModifierModel.destroy({
        where: { id },
        transaction
      });
      await this.businessMenuModifierItemModel.destroy({
        where: { businessMenuModifierId: id },
        transaction
      });
      await transaction.commit();
      return res > 0 ? true : false;
    } catch (error) {
      await transaction.rollback();
      throw new Error('cannot create menu modifier');
    }
  }

  // TODO move this method to repository : BusinessMenuModifierItemRepository
  // function: findByBusinessMenuModifierIds
  public async menuModifierItemFindByMenuModifierIds(
    ids: string[]
  ): Promise<BusinessMenuModifierItemModel[]> {
    return await this.businessMenuModifierItemModel.findAll({
      where: {
        businessMenuModifierId: {
          [Op.in]: ids
        }
      }
    });
  }
}
