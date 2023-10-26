import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessMerchantProductModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { BusinessMerchantProductGetListRequest } from '../dto/businessMerchantProductGetListRequest.dto';
import {
  IBusinessMerchantProductRepository,
  PagingBusinessMerchantProductModel
} from './businessMerchantProduct.interface';

@Injectable()
export class BusinessMerchantProductRepository
  implements IBusinessMerchantProductRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MERCHANT_PRODUCT_MODEL)
    private readonly businessMerchantProductModel: typeof BusinessMerchantProductModel
  ) {}
  public async findByIds(
    ids: string[]
  ): Promise<BusinessMerchantProductModel[]> {
    return this.businessMerchantProductModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findAll(
    dto: BusinessMerchantProductGetListRequest
  ): Promise<PagingBusinessMerchantProductModel> {
    const { sortBy, page, pageSize, filter } = dto;
    const result = await this.businessMerchantProductModel.findAndCountAll({
      where: {
        businessId: filter.bussinessId,
        status: 'active'
      },
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      businessMerchantProducts: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByBusinessId(
    ids: string[]
  ): Promise<BusinessMerchantProductModel[]> {
    const result = await this.businessMerchantProductModel.findAll({
      where: {
        businessId: {
          [Op.in]: ids
        }
      }
    });
    return this.businessMerchantProductModel.findAll({
      where: {
        businessId: {
          [Op.in]: ids
        }
      }
    });
  }
}
