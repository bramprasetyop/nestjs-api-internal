import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, OrganizationModel } from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { OrganizationCreateRequest } from '../dto/organizationCreateRequest.dto';
import { OrganizationGetListRequest } from '../dto/organizationGetListRequest.dto';
import {
  IOrganizationRepository,
  PagingOrganizationModel
} from './organization.interface';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_MODEL)
    private readonly organizationModel: typeof OrganizationModel
  ) {}

  public async findAll(
    dto: OrganizationGetListRequest
  ): Promise<PagingOrganizationModel> {
    const { sortBy, page, pageSize } = dto;
    const result = await this.organizationModel.findAndCountAll({
      where: {},
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      organizations: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(id: string): Promise<OrganizationModel> {
    return await this.organizationModel.findByPk(id);
  }

  public async findByIds(ids: string[]): Promise<OrganizationModel[]> {
    return await this.organizationModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async create(
    dto: OrganizationCreateRequest
  ): Promise<OrganizationModel> {
    return await this.organizationModel.create<OrganizationModel>(dto);
  }
}
