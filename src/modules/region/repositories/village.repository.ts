import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, VillageModel } from '@wahyoo/wahyoo-shared';
import { Sequelize } from 'sequelize';
import { VillageGetListRequest } from '../dto/villageGetListRequest.dto';
import { IVillageRepository, PagingVillageModel } from './village.interface';
import { Op } from 'sequelize';

@Injectable()
export class VillageRepository implements IVillageRepository {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.VILLAGE_MODEL)
    private readonly villageModel: typeof VillageModel
  ) {
    this.sequelize = this.villageModel.sequelize;
  }

  public async findAll(
    dto: VillageGetListRequest
  ): Promise<PagingVillageModel> {
    const { sortBy, page, pageSize, search, districtId, filter } = dto;
    const whereClause: any = {};
    if (districtId) {
      whereClause.districtId = districtId;
    }
    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }
    if (filter?.cityName) {
      whereClause[Op.or] = [
        this.villageModel.sequelize.Sequelize.literal(
          `district_id in
          (select d.id from districts d
            inner join cities c on c.id=d.city_id
            where LOWER(c.name) ilike LOWER('%${filter?.cityName}%'))`
        )
      ];
    }
    if (filter?.districtName) {
      whereClause[Op.or] = [
        this.villageModel.sequelize.Sequelize.literal(
          `district_id in (select id from districts where LOWER(name) ilike LOWER('%${filter?.districtName}%') )`
        )
      ];
    }
    const result = await this.villageModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      villages: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<VillageModel[]> {
    return await this.villageModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findOneById(id: string): Promise<VillageModel> {
    return await this.villageModel.findOne({
      where: {
        id
      }
    });
  }
}
