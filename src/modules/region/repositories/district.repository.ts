import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, DistrictModel } from '@wahyoo/wahyoo-shared';
import { Sequelize } from 'sequelize';
import { DistrictGetListRequest } from '../dto/districtGetListRequest.dto';
import { IDistrictRepository, PagingDistrictModel } from './district.interface';
import { Op } from 'sequelize';

@Injectable()
export class DistrictRepository implements IDistrictRepository {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.DISTRICT_MODEL)
    private readonly districtModel: typeof DistrictModel
  ) {
    this.sequelize = this.districtModel.sequelize;
  }

  public async findAll(
    dto: DistrictGetListRequest
  ): Promise<PagingDistrictModel> {
    const { sortBy, page, pageSize, search, cityId } = dto;
    const whereClause: any = {};
    if (cityId) {
      whereClause.cityId = cityId;
    }
    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }
    const result = await this.districtModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      districts: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<DistrictModel[]> {
    return await this.districtModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }
}
