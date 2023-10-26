import { Inject } from '@nestjs/common';
import {
  InjectionKey,
  OrganizationUserBusinessModel
} from '@wahyoo/wahyoo-shared';
import { error } from 'console';
import { Op } from 'sequelize';
import { OrganizationUserBusinessCreateRequest } from '../dto/organizationUserBusinessCreateRequest.dto';
import { OrganizationUserBusinessGetListRequest } from '../dto/organizationUserBusinessGetListRequest.dto';
import { OrganizationUserBusinessUpdateRequest } from '../dto/organizationUserBusinessUpdateRequest.dto';
import {
  findByFieldsArgs,
  IOrganizationUserBusinessRepository,
  PagingOrganizationUserBusinessModel
} from './organizationUserBusiness.interface';

export class OrganizationUserBusinessRepository
  implements IOrganizationUserBusinessRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_USER_BUSINESS_MODEL)
    private readonly organizationUserBusinessModel: typeof OrganizationUserBusinessModel
  ) {}

  public async findAll(
    dto: OrganizationUserBusinessGetListRequest
  ): Promise<PagingOrganizationUserBusinessModel> {
    const { sortBy, page, pageSize, filter, search, disabledPagination } = dto;
    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }
      if (filter.businessId) {
        whereClause.businessId = filter.businessId;
      }
    }

    if (search) {
      whereClause[Op.and] = [
        this.organizationUserBusinessModel.sequelize.Sequelize.literal(
          `organization_user_id in (select id from organization_users ou where LOWER(ou.name) like LOWER('%${search}%'))`
        )
      ];
    }

    const result = await this.organizationUserBusinessModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: disabledPagination ? undefined : pageSize,
      offset: disabledPagination ? undefined : pageSize * page
    });

    return {
      organizationUserBusinesses: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(id: string): Promise<OrganizationUserBusinessModel> {
    return await this.organizationUserBusinessModel.findByPk(id);
  }

  async findByBusinessIds(
    ids: string[]
  ): Promise<OrganizationUserBusinessModel[]> {
    return this.organizationUserBusinessModel.findAll({
      where: {
        businessId: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByFields(
    args: findByFieldsArgs
  ): Promise<OrganizationUserBusinessModel> {
    return await this.organizationUserBusinessModel.findOne({
      where: { ...args }
    });
  }

  public async create(
    dto: OrganizationUserBusinessCreateRequest
  ): Promise<OrganizationUserBusinessModel> {
    const organizationUserBusiness = await this.organizationUserBusinessModel.findOne(
      {
        where: {
          organizationUserId: dto.organizationUserId,
          businessId: dto.businessId
        }
      }
    );
    if (organizationUserBusiness) {
      throw new Error(
        'Bisnis yang di pilih tidak tersedia! Silakan pilih bisnis yang berbeda'
      );
    }
    return await this.organizationUserBusinessModel.create<
      OrganizationUserBusinessModel
    >(dto);
  }

  public async update(
    dto: OrganizationUserBusinessUpdateRequest
  ): Promise<OrganizationUserBusinessModel> {
    try {
      const { id, organizationUserId, businessId } = dto;
      const organizationUserBusinessesTaken = await this.organizationUserBusinessModel.findOne(
        {
          where: {
            organizationUserId,
            businessId,
            id: {
              [Op.ne]: id
            }
          }
        }
      );
      if (organizationUserBusinessesTaken) {
        throw new Error(
          'Bisnis yang di pilih tidak tersedia! Silakan pilih bisnis yang berbeda'
        );
      }
      const organizationUserBusiness = await this.findById(id);
      return organizationUserBusiness.update(dto);
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: string): Promise<Boolean> {
    const res = await this.organizationUserBusinessModel.destroy({
      where: { id }
    });
    return res > 0;
  }
}
