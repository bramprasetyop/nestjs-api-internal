import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, CityModel } from '@wahyoo/wahyoo-shared';
import { Sequelize } from 'sequelize';
import { CityGetListRequest } from '../dto/cityGetListRequest.dto';
import { ICityRepository, PagingCityModel } from './city.interface';
import { Op } from 'sequelize';

@Injectable()
export class CityRepository implements ICityRepository {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.CITY_MODEL)
    private readonly cityModel: typeof CityModel
  ) {
    this.sequelize = this.cityModel.sequelize;
  }

  public async findAll(dto: CityGetListRequest): Promise<PagingCityModel> {
    const { sortBy, page, pageSize, search, provinceId } = dto;
    const whereClause: any = {};
    if (provinceId) {
      whereClause.provinceId = provinceId;
    }
    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }
    const result = await this.cityModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      cities: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<CityModel[]> {
    return await this.cityModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }
}
