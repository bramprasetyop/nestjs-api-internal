import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, ProvinceModel } from '@wahyoo/wahyoo-shared';
import { Sequelize } from 'sequelize';
import { ProvinceGetListRequest } from '../dto/provinceGetListRequest.dto';
import { IProvinceRepository, PagingProvinceModel } from './province.interface';
import { Op } from 'sequelize';

@Injectable()
export class ProvinceRepository implements IProvinceRepository {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.PROVINCE_MODEL)
    private readonly provinceModel: typeof ProvinceModel
  ) {
    this.sequelize = this.provinceModel.sequelize;
  }

  public async findAll(
    dto: ProvinceGetListRequest
  ): Promise<PagingProvinceModel> {
    const { sortBy, page, pageSize, search } = dto;
    const whereClause: any = {};
    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }
    const result = await this.provinceModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      provinces: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<ProvinceModel[]> {
    return await this.provinceModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }
}
