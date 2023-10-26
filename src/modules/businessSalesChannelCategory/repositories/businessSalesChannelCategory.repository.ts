import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  BusinessSalesChannelCategoryModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { BusinessSalesChannelCategoryCreateRequest } from '../dto/businessSalesChannelCategoryCreateRequest.dto';
import { BusinessSalesChannelCategoryUpdateRequest } from '../dto/businessSalesChannelCategoryUpdateRequest.dto';
import { BusinessSalesChannelCategoryGetListRequest } from '../dto/businessSalesChannelCategoryGetListRequest.dto';
import {
  IBusinessSalesChannelCategoryRepository,
  PagingBusinessSalesChannelCategoryModel
} from './businessSalesChannelCategory.interface';

@Injectable()
export class BusinessSalesChannelCategoryRepository
  implements IBusinessSalesChannelCategoryRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_CATEGORY_MODEL)
    private readonly businessSalesChannelCategoryModel: typeof BusinessSalesChannelCategoryModel
  ) {}

  public async findAll(
    dto: BusinessSalesChannelCategoryGetListRequest
  ): Promise<PagingBusinessSalesChannelCategoryModel> {
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
    }

    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }
    const result = await this.businessSalesChannelCategoryModel.findAndCountAll(
      {
        where: whereClause,
        order: [[sortBy.columnName, sortBy.sortOrder]],
        limit: pageSize,
        offset: pageSize * page
      }
    );
    return {
      businessSalesChannelCategories: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(
    ids: string[]
  ): Promise<BusinessSalesChannelCategoryModel[]> {
    return await this.businessSalesChannelCategoryModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findById(
    id: string
  ): Promise<BusinessSalesChannelCategoryModel> {
    return await this.businessSalesChannelCategoryModel.findByPk(id);
  }

  public async create(
    dto: BusinessSalesChannelCategoryCreateRequest
  ): Promise<BusinessSalesChannelCategoryModel> {
    return await this.businessSalesChannelCategoryModel.create<
      BusinessSalesChannelCategoryModel
    >(dto);
  }

  public async update(
    dto: BusinessSalesChannelCategoryUpdateRequest
  ): Promise<BusinessSalesChannelCategoryModel> {
    const { id } = dto;
    const business = await this.findById(id);
    return await business.update(dto);
  }

  public async destroyById(id: string): Promise<Boolean> {
    const res = await this.businessSalesChannelCategoryModel.destroy({
      where: { id }
    });
    return res > 0 ? true : false;
  }
}
