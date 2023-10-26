import { Inject } from '@nestjs/common';
import {
  BusinessOutletModel,
  InjectionKey,
  OrganizationUserBusinessOutletModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { OrganizationUserBusinessOutletCreateRequest } from '../dto/organizationUserBusinessOutletCreateRequest.dto';
import { OrganizationUserBusinessOutletGetListRequest } from '../dto/organizationUserBusinessOutletGetListRequest.dto';
import { OrganizationUserBusinessOutletUpdateRequest } from '../dto/organizationUserBusinessOutletUpdateRequest.dto';
import {
  findAllByRoleAndOrganizationUserIdArgs,
  findByFieldsArgs,
  IOrganizationUserBusinessOutletRepository,
  PagingOrganizationUserBusinessOutletModel
} from './organizationUserBusinessOutlet.interface';

export class OrganizationUserBusinessOutletRepository
  implements IOrganizationUserBusinessOutletRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_USER_BUSINESS_OUTLET_MODEL)
    private readonly organizationUserBusinessOutletModel: typeof OrganizationUserBusinessOutletModel
  ) {}

  public async findAll(
    dto: OrganizationUserBusinessOutletGetListRequest
  ): Promise<PagingOrganizationUserBusinessOutletModel> {
    const { sortBy, page, pageSize, filter, search, disabledPagination } = dto;
    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }
      if (filter.businessOutletId) {
        whereClause.businessOutletId = filter.businessOutletId;
      }
    }

    if (search) {
      whereClause[Op.and] = [
        this.organizationUserBusinessOutletModel.sequelize.Sequelize.literal(
          `organization_user_id in (select id from organization_users ou where LOWER(ou.name) like LOWER('%${search}%'))`
        )
      ];
    }

    const result = await this.organizationUserBusinessOutletModel.findAndCountAll(
      {
        where: whereClause,
        include: [
          {
            required: true,
            model: BusinessOutletModel,
            as: 'businessOutlet'
          }
        ],
        order: [[sortBy.columnName, sortBy.sortOrder]],
        limit: disabledPagination ? undefined : pageSize,
        offset: disabledPagination ? undefined : pageSize * page
      }
    );

    return {
      organizationUserBusinessOutlets: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(
    id: string
  ): Promise<OrganizationUserBusinessOutletModel> {
    return await this.organizationUserBusinessOutletModel.findByPk(id);
  }

  async findByBusinessOutletIds(
    ids: string[]
  ): Promise<OrganizationUserBusinessOutletModel[]> {
    return this.organizationUserBusinessOutletModel.findAll({
      where: {
        businessOutletId: {
          [Op.in]: ids
        }
      },
      include: [
        {
          required: true,
          model: BusinessOutletModel,
          as: 'businessOutlet'
        }
      ]
    });
  }

  async findByOrganizationUserIds(
    ids: string[]
  ): Promise<OrganizationUserBusinessOutletModel[]> {
    return this.organizationUserBusinessOutletModel.findAll({
      where: {
        organizationUserId: {
          [Op.in]: ids
        }
      },
      include: [
        {
          required: true,
          model: BusinessOutletModel,
          as: 'businessOutlet'
        }
      ]
    });
  }

  public async findByFields(
    args: findByFieldsArgs
  ): Promise<OrganizationUserBusinessOutletModel> {
    return await this.organizationUserBusinessOutletModel.findOne({
      where: { ...args }
    });
  }

  public async create(
    dto: OrganizationUserBusinessOutletCreateRequest
  ): Promise<OrganizationUserBusinessOutletModel> {
    const organizationUserBusinessOutlet = await this.organizationUserBusinessOutletModel.findOne(
      {
        where: {
          organizationUserId: dto.organizationUserId,
          businessOutletId: dto.businessOutletId
        }
      }
    );
    if (organizationUserBusinessOutlet) {
      throw new Error(
        'Outlet yang di pilih telah terdaftar! Silakan pilih outlet yang berbeda'
      );
    }
    return await this.organizationUserBusinessOutletModel.create<
      OrganizationUserBusinessOutletModel
    >(dto);
  }

  public async update(
    dto: OrganizationUserBusinessOutletUpdateRequest
  ): Promise<OrganizationUserBusinessOutletModel> {
    try {
      const { id } = dto;
      const organizationUserBusinessOutlet = await this.findById(id);
      const businessOutletTaken = await this.organizationUserBusinessOutletModel.findOne(
        {
          where: {
            organizationUserId: dto.organizationUserId,
            businessOutletId: dto.businessOutletId,
            id: {
              [Op.ne]: id
            }
          }
        }
      );
      if (businessOutletTaken) {
        throw new Error(
          'Outlet yang di pilih telah terdaftar! Silakan pilih outlet yang berbeda'
        );
      }
      return organizationUserBusinessOutlet.update(dto);
    } catch (err) {
      throw err;
    }
  }

  public async findAllByRoleAndOrganizationUserId(
    args: findAllByRoleAndOrganizationUserIdArgs
  ): Promise<OrganizationUserBusinessOutletModel[]> {
    const organizationUserBusinessOutlets = await this.organizationUserBusinessOutletModel.findAll(
      {
        where: {
          organizationUserId: args.organizationUserId,
          roles: { [Op.contains]: [args.role] }
        }
      }
    );

    return organizationUserBusinessOutlets;
  }

  public async delete(id: string): Promise<Boolean> {
    const res = await this.organizationUserBusinessOutletModel.destroy({
      where: { id }
    });
    return res > 0;
  }

  async findByBusinessIds(
    ids: string[]
  ): Promise<OrganizationUserBusinessOutletModel[]> {
    return this.organizationUserBusinessOutletModel.findAll({
      include: [
        {
          required: true,
          model: BusinessOutletModel,
          as: 'businessOutlet',
          where: {
            businessId: {
              [Op.in]: ids
            }
          }
        }
      ]
    });
  }
}
