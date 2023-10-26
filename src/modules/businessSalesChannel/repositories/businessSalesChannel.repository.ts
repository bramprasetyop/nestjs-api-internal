import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  BusinessSalesChannelModel,
  BusinessSalesChannelPaymentTypeModel,
  BusinessPaymentTypeModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { BusinessSalesChannelCreateRequest } from '../dto/businessSalesChannelCreateRequest.dto';
import { BusinessSalesChannelUpdateRequest } from '../dto/businessSalesChannelUpdateRequest.dto';
import { BusinessSalesChannelGetListRequest } from '../dto/businessSalesChannelGetListRequest.dto';
import {
  IBusinessSalesChannelRepository,
  PagingBusinessSalesChannelModel
} from './businessSalesChannel.interface';
import { BusinessPaymentType } from 'src/modules/businessPaymentType/dto/businessPaymentType.dto';

@Injectable()
export class BusinessSalesChannelRepository
  implements IBusinessSalesChannelRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_MODEL)
    private readonly businessSalesChannelModel: typeof BusinessSalesChannelModel,
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_PAYMENT_TYPE_MODEL)
    private readonly businessSalesChannelPaymentTypeModel: typeof BusinessSalesChannelPaymentTypeModel
  ) {}

  public async findAll(
    dto: BusinessSalesChannelGetListRequest
  ): Promise<PagingBusinessSalesChannelModel> {
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
    const result = await this.businessSalesChannelModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      businessSalesChannels: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<BusinessSalesChannelModel[]> {
    return await this.businessSalesChannelModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findById(id: string): Promise<BusinessSalesChannelModel> {
    return await this.businessSalesChannelModel.findByPk(id);
  }

  public async create(
    dto: BusinessSalesChannelCreateRequest
  ): Promise<BusinessSalesChannelModel> {
    const { businessSalesChannelPaymentTypes } = dto;
    let transaction;
    try {
      transaction = await this.businessSalesChannelModel.sequelize.transaction();
      const businessSalesChannel = await this.businessSalesChannelModel.create<
        BusinessSalesChannelModel
      >(dto, { transaction });
      const promises: any[] = businessSalesChannelPaymentTypes.map(data => {
        return this.businessSalesChannelPaymentTypeModel.create(
          {
            ...data,
            businessSalesChannelId: businessSalesChannel.id
          },
          { transaction }
        );
      });

      await Promise.all(promises);
      await transaction.commit();
      return businessSalesChannel;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async update(
    dto: BusinessSalesChannelUpdateRequest
  ): Promise<BusinessSalesChannelModel> {
    const { id, businessSalesChannelPaymentTypes } = dto;
    const businessSalesChannel = await this.findById(id);
    const existingIds = businessSalesChannelPaymentTypes
      .filter(
        businessSalesChannelPaymentType => businessSalesChannelPaymentType.id
      )
      .map(
        businessSalesChannelPaymentType => businessSalesChannelPaymentType.id
      );
    let transaction;
    try {
      transaction = await this.businessSalesChannelModel.sequelize.transaction();
      await this.businessSalesChannelPaymentTypeModel.destroy({
        where: { businessMenuModifierId: id, id: { [Op.notIn]: existingIds } },
        transaction
      });
      const promises: any[] = businessSalesChannelPaymentTypes.map(
        businessSalesChannelPaymentType => {
          if (!businessSalesChannelPaymentType.id) {
            delete businessSalesChannelPaymentType.id;
          }
          return this.businessSalesChannelPaymentTypeModel.upsert(
            {
              ...businessSalesChannelPaymentType,
              businessSalesChannelId: id
            },
            { transaction }
          );
        }
      );
      await Promise.all(promises);
      const updatedData = await businessSalesChannel.update(dto, {
        transaction
      });

      await transaction.commit();
      return updatedData;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async destroyById(id: string): Promise<Boolean> {
    let transaction;
    try {
      transaction = await this.businessSalesChannelModel.sequelize.transaction();
      const res = await this.businessSalesChannelModel.destroy({
        where: { id },
        transaction
      });
      await this.businessSalesChannelPaymentTypeModel.destroy({
        where: { businessSalesChannelId: id },
        transaction
      });
      await transaction.commit();
      return res > 0 ? true : false;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  // TODO: separate to repository: BusinessSalesChannelPaymentTypeRepository
  // function findByBusinessSalesChannelIds
  public async paymentTypeFindBySalesChannelIds(
    ids: string[]
  ): Promise<BusinessSalesChannelPaymentTypeModel[]> {
    const data = await this.businessSalesChannelPaymentTypeModel.findAll({
      where: {
        businessSalesChannelId: {
          [Op.in]: ids
        }
      },
      include: [BusinessPaymentTypeModel]
    });
    return data;
  }
}
