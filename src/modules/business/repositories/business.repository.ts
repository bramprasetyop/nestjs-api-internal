import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, BusinessModel } from '@wahyoo/wahyoo-shared';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { BusinessCreateRequest } from '../dto/businessCreateRequest.dto';
import { BusinessUpdateRequest } from '../dto/businessUpdateRequest.dto';
import { BusinessGetListRequest } from '../dto/businessGetListRequest.dto';
import { IBusinessRepository, PagingBusinessModel } from './business.interface';

@Injectable()
export class BusinessRepository implements IBusinessRepository {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.BUSINESS_MODEL)
    private readonly businessModel: typeof BusinessModel
  ) {
    this.sequelize = this.businessModel.sequelize;
  }

  public async findAll(
    dto: BusinessGetListRequest
  ): Promise<PagingBusinessModel> {
    const { sortBy, page, pageSize, disabledPagination } = dto;
    const result = await this.businessModel.findAndCountAll({
      where: {},
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: disabledPagination ? undefined : pageSize,
      offset: disabledPagination ? undefined : pageSize * page
    });
    return {
      businesses: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findAllByIsHiddenToPublic(
    dto: BusinessGetListRequest
  ): Promise<PagingBusinessModel> {
    const { sortBy, page, pageSize } = dto;
    const result = await this.businessModel.findAndCountAll({
      where: {
        isHiddenToPublic: false
      },
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      businesses: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<BusinessModel[]> {
    return await this.businessModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByIdIsHiddenToPublic(id: string): Promise<BusinessModel> {
    return await this.businessModel.findOne({
      where: {
        id,
        isHiddenToPublic: false
      }
    });
  }

  public async findById(id: string): Promise<BusinessModel> {
    return await this.businessModel.findByPk(id);
  }

  public async create(dto: BusinessCreateRequest): Promise<BusinessModel> {
    return await this.businessModel.create<BusinessModel>(dto);
  }

  public async update(dto: BusinessUpdateRequest): Promise<BusinessModel> {
    const { id } = dto;
    const business = await this.findById(id);
    return await business.update(dto);
  }

  public async destroyById(id: string): Promise<Boolean> {
    const res = await this.businessModel.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  async findByBusinessMenuItemId(id: string) {
    const sqlQuery = `select bsc.business_id as "businessId" from business_menu_items bmi 
    inner join business_sales_channel_menu_items bscmi ON bscmi.business_menu_item_id=bmi.id 
    inner join business_sales_channels bsc on bsc.id=bscmi.business_sales_channel_id 
    where bmi.id='${id}'
    limit 1;`;

    const [firstRow]: any[] = await this.sequelize.query(sqlQuery, {
      type: QueryTypes.SELECT
    });

    if (firstRow) {
      return this.businessModel.findByPk(firstRow.businessId);
    }
    return null;
  }

  async findByBusinessMenuCategoryId(id: string) {
    const sqlQuery = `select bsc.business_id as "businessId" from business_menu_categories bmc 
    inner join business_sales_channel_menu_categories bscmc ON bscmc.business_menu_category_id=bmc.id 
    inner join business_sales_channels bsc on bsc.id=bscmc.business_sales_channel_id 
    where bmc.id='${id}'
    limit 1;`;

    const [firstRow]: any[] = await this.sequelize.query(sqlQuery, {
      type: QueryTypes.SELECT
    });

    if (firstRow) {
      return this.businessModel.findByPk(firstRow.businessId);
    }
    return null;
  }
}
