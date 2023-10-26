import { SortOrder } from 'src/commons/pagination.dto';
import { Injectable, Inject } from '@nestjs/common';
import { AppVersionListRequest } from '../dto/appVersionListRequest.dto';
import { AppVersionCreateRequest } from '../dto/appVersionCreateRequest.dto';
import { AppVersionUpdateRequest } from '../dto/appVersionUpdateRequest.tdo';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { AppVersionsModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import {
  IAppVersionRepository,
  PagingAppVersionModel
} from './appVersion.interface';

@Injectable()
export class AppVersionRepository implements IAppVersionRepository {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.APP_VERSIONS_MODEL)
    private readonly appVersionModel: typeof AppVersionsModel
  ) {
    this.sequelize = this.appVersionModel.sequelize;
  }

  public async findAll(
    dto: AppVersionListRequest
  ): Promise<PagingAppVersionModel> {
    const { sortBy, page, pageSize, search } = dto;
    if (!sortBy.columnName) sortBy.columnName = 'createdAt';
    if (!sortBy.sortOrder) sortBy.sortOrder = SortOrder.DESC;
    const whereClause: any = {};
    if (search) {
      whereClause.appName = { [Op.iLike]: '%' + search + '%' };
    }
    const result = await this.appVersionModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      appVersions: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findByIds(ids: string[]): Promise<AppVersionsModel[]> {
    return this.appVersionModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findById(id: string): Promise<AppVersionsModel> {
    return this.appVersionModel.findByPk(id);
  }

  public async create(dto: AppVersionCreateRequest): Promise<AppVersionsModel> {
    return this.appVersionModel.create(dto);
  }

  public async update(dto: AppVersionUpdateRequest): Promise<AppVersionsModel> {
    const { id } = dto;

    const appVersion = await this.appVersionModel.findByPk(id);

    const dataAppversionUpdate = {};
    Object.keys(dto).forEach(key => {
      if (dto[key] !== null) {
        dataAppversionUpdate[key] = dto[key];
      }
    });

    return appVersion.update({
      ...dataAppversionUpdate
    });
  }

  public async detele(id: string): Promise<Boolean> {
    const result = await this.appVersionModel.destroy({ where: { id } });
    return result > 0 ? true : false;
  }

  public async findByLatestAppVersion(): Promise<AppVersionsModel> {
    const sql =
      'SELECT id, app_name AS "appName", latest_version AS "latestVersion", force_update_method AS "forceUpdateMethod", enable_force_update AS "enableForceUpdate", force_update_type AS "forceUpdateType", created_at AS "createdAt", updated_at AS "updatedAt", deleted_at FROM app_versions WHERE latest_version=(SELECT MAX(latest_version) FROM app_versions WHERE deleted_at IS NULL) AND deleted_at IS NULL';
    const [
      resultVersion
    ]: AppVersionsModel[] = await this.appVersionModel.sequelize.query(sql, {
      type: QueryTypes.SELECT
    });

    if (!resultVersion) {
      throw Error('latest appVersion not found');
    }
    return new AppVersionsModel(resultVersion);
  }
}
