import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, BusinessPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { BusinessPaymentTypeCreateRequest } from '../dto/businessPaymentTypeCreateRequest.dto';
import { BusinessPaymentTypeUpdateRequest } from '../dto/businessPaymentTypeUpdateRequest.dto';
import { BusinessPaymentTypeGetListRequest } from '../dto/businessPaymentTypeGetListRequest.dto';
import {
  IBusinessPaymentTypeRepository,
  PagingBusinessPaymentTypeModel
} from './businessPaymentType.interface';

@Injectable()
export class BusinessPaymentTypeRepository
  implements IBusinessPaymentTypeRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_PAYMENT_TYPE_MODEL)
    private readonly businessPaymentTypeModel: typeof BusinessPaymentTypeModel
  ) {}

  public async findAll(
    dto: BusinessPaymentTypeGetListRequest
  ): Promise<PagingBusinessPaymentTypeModel> {
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
    const result = await this.businessPaymentTypeModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      businessPaymentTypes: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<BusinessPaymentTypeModel[]> {
    return await this.businessPaymentTypeModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findById(id: string): Promise<BusinessPaymentTypeModel> {
    return await this.businessPaymentTypeModel.findByPk(id);
  }

  public async create(
    dto: BusinessPaymentTypeCreateRequest
  ): Promise<BusinessPaymentTypeModel> {
    return await this.businessPaymentTypeModel.create<BusinessPaymentTypeModel>(
      dto
    );
  }

  public async update(
    dto: BusinessPaymentTypeUpdateRequest
  ): Promise<BusinessPaymentTypeModel> {
    const { id } = dto;
    const business = await this.findById(id);
    return await business.update(dto);
  }

  public async destroyById(id: string): Promise<Boolean> {
    const res = await this.businessPaymentTypeModel.destroy({ where: { id } });
    return res > 0 ? true : false;
  }
}
