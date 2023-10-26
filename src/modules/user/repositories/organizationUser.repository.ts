import { Inject } from '@nestjs/common';
import {
  BusinessModel,
  BusinessOutletModel,
  InjectionKey,
  OrganizationUserBusinessModel,
  OrganizationUserBusinessOutletModel,
  OrganizationUserModel,
  XOrganizationUserWahyooUserModel,
  OrganizationModel,
  BusinessOutletLeadModel
} from '@wahyoo/wahyoo-shared';
import {
  FindByPhoneNumberArgs,
  IOrganizationUserRepository,
  PagingOrganizationUserModel
} from './organizationUser.interface';
import { Op } from 'sequelize';
import { OrganizationUserCreateRequest } from '../dto/organizationUserCreateRequest.dto';
import { OrganizationUserUpdateRequest } from '../dto/organizationUserUpdateRequest.dto';
import { OrganizationUserGetListRequest } from '../dto/organizationUserGetListRequest.dto';
import { OrganizationUserRegisterRequest } from '../dto/organizationUserRegisterRequest.dto';
import { OrganizationUserGetDetailRequest } from '../dto/organizationUserGetDetailRequest.dto';
import { OrganizationUserCreateOutletEmployeeRequest } from '../dto/organizationUserCreateOutletEmployeeRequest.dto';
import { OrganizationUserUpdateOutletEmployeeRequest } from '../dto/organizationUserUpdateOutletEmployeeRequest.dto';
import { OrganizationUserRole } from 'src/modules/auth/auth.constants';
import { OrganizationUserBusinessOutletGetByRoleAndOrganizationUserIdRequest } from '../dto/organizationUserBusinessOutletGetByRoleAndOrganizationUserIdRequest.dto';

interface OrganizationUserRepositoryDeleteArgs {
  id: string;
  xWahyooUserId?: string;
}

export class OrganizationUserRepository implements IOrganizationUserRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_USER_MODEL)
    private readonly organizationUserModel: typeof OrganizationUserModel,
    @Inject(InjectionKey.ORGANIZATION_USER_BUSINESS_MODEL)
    private readonly organizationUserBusinessModel: typeof OrganizationUserBusinessModel,
    @Inject(InjectionKey.BUSINESS_MODEL)
    private readonly businessModel: typeof BusinessModel,
    @Inject(InjectionKey.ORGANIZATION_USER_BUSINESS_OUTLET_MODEL)
    private readonly organizationUserBusinessOutletModel: typeof OrganizationUserBusinessOutletModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_MODEL)
    private readonly businessOutletModel: typeof BusinessOutletModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MODEL)
    private readonly businessOutletLeadModel: typeof BusinessOutletLeadModel,
    @Inject(InjectionKey.X_ORGANIZATION_USER_WAHYOO_USER_MODEL)
    private readonly xOrganizationUserWahyooUserModel: typeof XOrganizationUserWahyooUserModel,
    @Inject(InjectionKey.ORGANIZATION_MODEL)
    private readonly organizationModel: typeof OrganizationModel
  ) {}
  async getAllOrganizationUserIds() {
    return await this.organizationUserModel.findAll({
      attributes: ['id'],
      raw: true
    });
  }

  private async findAllByRoleAndOrganizationUserId(
    dto: OrganizationUserBusinessOutletGetByRoleAndOrganizationUserIdRequest
  ): Promise<OrganizationUserBusinessOutletModel[]> {
    const { organizationUserId, role } = dto;
    const organizationUserBusinessOutlets = await this.organizationUserBusinessOutletModel.findAll(
      {
        where: {
          organizationUserId,
          roles: { [Op.contains]: [role] }
        }
      }
    );

    return organizationUserBusinessOutlets;
  }

  public async findAll(
    dto: OrganizationUserGetListRequest
  ): Promise<PagingOrganizationUserModel> {
    const { sortBy, page, pageSize, filter, search, disabledPagination } = dto;
    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }
      if (filter.isEmployee) {
        whereClause.isEmployee = filter.isEmployee;
      }

      if (filter.brand) {
        switch (filter.brand) {
          case 'Other':
            whereClause.interestedBrand = {
              [Op.notIn]: [
                'Bebek Goreng Bikin Tajir',
                'Bakso Bikin Tajir',
                'Ayam Paduka'
              ]
            };
            break;
          default:
            whereClause.interestedBrand = {
              [Op.iLike]: '%' + filter.brand + '%'
            };
            break;
        }
      }

      if (filter.leadSource) {
        switch (filter.leadSource) {
          case 'Other':
            whereClause.organizationKnowSource = {
              [Op.notIn]: ['Instagram', 'Facebook', 'Berita', 'Sales', 'Teman']
            };
            break;
          case 'Instagram/Facebook':
            whereClause.organizationKnowSource = {
              [Op.in]: ['Instagram', 'Facebook']
            };
            break;
          default:
            whereClause.organizationKnowSource = {
              [Op.iLike]: '%' + filter.leadSource + '%'
            };
            break;
        }
      }

      if (filter.outletRegistration) {
        switch (filter.outletRegistration) {
          case 'Yes':
            whereClause[Op.or] = [
              this.organizationUserModel.sequelize.Sequelize.literal(
                `id in (select organization_user_id from organization_user_business_outlets)`
              )
            ];
            break;
          case 'No':
            whereClause[Op.or] = [
              this.organizationUserModel.sequelize.Sequelize.literal(
                `id not in (select organization_user_id from organization_user_business_outlets)`
              )
            ];
            break;
          default:
            whereClause[Op.or] = [];
            break;
        }
      }
    }

    if (search) {
      const escapedSearch = this.organizationUserModel.sequelize.escape(
        `%${search}%`
      );
      whereClause[Op.or] = [
        { name: { [Op.iLike]: '%' + search + '%' } },
        { phoneNumber: { [Op.iLike]: '%' + search + '%' } },
        { interestedBrand: { [Op.iLike]: '%' + search + '%' } },
        { organizationKnowSource: { [Op.iLike]: '%' + search + '%' } },
        this.organizationUserModel.sequelize.Sequelize.literal(
          `CAST("OrganizationUserModel"."id" AS TEXT) ILIKE ${escapedSearch}`
        )
      ];
    }

    const result = await this.organizationUserModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: disabledPagination ? undefined : pageSize,
      offset: disabledPagination ? undefined : pageSize * page
    });

    return {
      organizationUsers: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }
  async findByPhoneNumber({
    phoneNumber,
    countryCode
  }: FindByPhoneNumberArgs): Promise<any> {
    const organizationUser = await this.organizationUserModel.findOne({
      where: {
        phoneNumber,
        countryCode
      }
    });
    return organizationUser;
  }
  async findById(id: string): Promise<OrganizationUserModel> {
    const organizationUser = await this.organizationUserModel.findByPk(id, {
      include: [
        {
          model: this.businessModel
        },
        {
          model: this.organizationUserBusinessOutletModel,
          include: [
            {
              model: this.businessOutletModel
            }
          ]
        }
      ]
    });
    return organizationUser;
  }
  async findByIds(ids: string[]): Promise<any> {
    const organizationUser = await this.organizationUserModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      },
      include: [
        {
          model: this.businessModel
        },
        {
          model: this.businessOutletModel
        }
      ]
    });
    return organizationUser;
  }
  async findOne(conditions: any): Promise<OrganizationUserModel> {
    const organizationUser = await this.organizationUserModel.findOne({
      where: conditions
    });
    return organizationUser;
  }

  public async update(
    dto: OrganizationUserUpdateRequest
  ): Promise<OrganizationUserModel> {
    let transaction;
    try {
      const { id } = dto;

      const phoneNumberTaken = await this.organizationUserModel.findOne({
        where: {
          phoneNumber: dto.phoneNumber,
          id: { [Op.ne]: id }
        }
      });

      if (phoneNumberTaken) {
        throw new Error('Nomor HP telah terdaftar');
      }

      const organizationUser = await this.findById(id);

      const { isConnectToWahyooUser } = dto;

      if (isConnectToWahyooUser && dto.newUserId) {
        const xOrganizationUserWahyooUser = await this.xOrganizationUserWahyooUserModel.findOne(
          {
            where: {
              organizationUserId: id,
              // User from old phone number taken from input
              xWahyooUserId: dto.newUserId
            }
          }
        );
        if (xOrganizationUserWahyooUser)
          throw new Error('Nomor HP telah digunakan utk registrasi Wahyoo');
      }

      transaction = await this.organizationUserModel.sequelize.transaction();

      const updatedOrganizationUser = await organizationUser.update(dto, {
        transaction
      });

      if (isConnectToWahyooUser && !dto.xOrganizationUserWahyooUserExists) {
        await this.xOrganizationUserWahyooUserModel.create(
          {
            organizationUserId: id,
            // User from old phone number taken from input
            xWahyooUserId: dto.newUserId
          },
          { transaction }
        );
      }

      await transaction.commit();

      return updatedOrganizationUser;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  }

  public async create(
    dto: OrganizationUserCreateRequest
  ): Promise<OrganizationUserModel> {
    let transaction;
    try {
      const { isConnectToWahyooUser } = dto;

      const organization = await this.organizationModel.findOne({
        where: { name: 'TKB' }
      });

      const phoneNumberTaken = await this.organizationUserModel.findOne({
        where: {
          phoneNumber: dto.phoneNumber
        }
      });

      if (phoneNumberTaken) {
        throw new Error('Nomor HP telah digunakan');
      }

      if (isConnectToWahyooUser) {
        const xOrganizationUserWahyooUser = await this.xOrganizationUserWahyooUserModel.findOne(
          {
            where: { xWahyooUserId: dto.xWahyooUserId }
          }
        );
        if (xOrganizationUserWahyooUser)
          throw new Error('Nomor HP telah digunakan utk registrasi Wahyoo');
      }

      transaction = await this.organizationUserModel.sequelize.transaction();

      const organizationUser = await this.organizationUserModel.create<
        OrganizationUserModel
      >({ ...dto, organizationId: organization.id }, { transaction });

      if (isConnectToWahyooUser) {
        await this.xOrganizationUserWahyooUserModel.create(
          {
            xWahyooUserId: dto.xWahyooUserId,
            organizationUserId: organizationUser.id
          },
          { transaction }
        );
      }

      await transaction.commit();

      return organizationUser;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  }

  public async createFromRegistration(
    dto: OrganizationUserRegisterRequest
  ): Promise<OrganizationUserModel> {
    try {
      const organization = await this.organizationModel.findOne({
        where: { name: 'TKB' }
      });

      const phoneNumberTaken = await this.organizationUserModel.findOne({
        where: {
          phoneNumber: dto.phoneNumber
        }
      });

      if (phoneNumberTaken) {
        throw new Error('Nomor HP telah digunakan');
      }

      const organizationUser = await this.organizationUserModel.create<
        OrganizationUserModel
      >({
        ...dto,
        status: 'active',
        organizationId: organization.id
      });

      return organizationUser;
    } catch (err) {
      throw err;
    }
  }

  public async delete(
    args: OrganizationUserRepositoryDeleteArgs
  ): Promise<Boolean> {
    const { id, xWahyooUserId } = args;
    let transaction;
    try {
      const organizationUser = await this.findById(id);

      if (!organizationUser) {
        throw new Error('Organization user tidak dapat ditemukan');
      }

      const organizationUserBusinesses = await this.organizationUserBusinessModel.findAll(
        {
          where: {
            organizationUserId: id
          }
        }
      );

      const businessOutletLeads = await this.businessOutletLeadModel.findAll({
        where: {
          organizationUserId: id
        }
      });

      const organizationUserBusinessOutlets = await this.organizationUserBusinessOutletModel.findAll(
        {
          where: {
            organizationUserId: id
          }
        }
      );

      if (xWahyooUserId) {
        const xOrganizationUserWahyooUser = await this.xOrganizationUserWahyooUserModel.findOne(
          {
            where: {
              organizationUserId: id,
              xWahyooUserId
            }
          }
        );
        transaction = await this.organizationUserModel.sequelize.transaction();
        if (xOrganizationUserWahyooUser) {
          await xOrganizationUserWahyooUser.destroy({ transaction });
        }
      } else {
        transaction = await this.organizationUserModel.sequelize.transaction();
      }

      if (organizationUserBusinesses.length) {
        const promises: Promise<
          void
        >[] = organizationUserBusinesses.map(organizationUserBusiness =>
          organizationUserBusiness.destroy({ transaction })
        );
        await Promise.all(promises);
      }

      if (businessOutletLeads.length) {
        const promises: Promise<
          void
        >[] = businessOutletLeads.map(businessOutletLead =>
          businessOutletLead.destroy({ transaction })
        );
        await Promise.all(promises);
      }

      if (organizationUserBusinessOutlets.length) {
        const promises: Promise<
          void
        >[] = organizationUserBusinessOutlets.map(
          organizationUserBusinessOutlet =>
            organizationUserBusinessOutlet.destroy({ transaction })
        );
        await Promise.all(promises);
      }

      await organizationUser.destroy({ transaction });

      await transaction.commit();

      return true;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  }

  public async findAllOutletEmployee(
    dto: OrganizationUserGetListRequest
  ): Promise<PagingOrganizationUserModel> {
    const {
      sortBy,
      page,
      pageSize,
      filter,
      search,
      disabledPagination,
      currentUserId
    } = dto;

    const currentOrganizationUserBusinessOutlets = await this.findAllByRoleAndOrganizationUserId(
      {
        role: OrganizationUserRole.OUTLET_OWNER,
        organizationUserId: currentUserId
      }
    );
    if (currentOrganizationUserBusinessOutlets.length === 0) {
      throw new Error(
        'User yang saat ini digunakan untuk login tidak memiliki akses sebagai outlet owner'
      );
    }

    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }
    }

    if (search) {
      const escapedSearch = this.organizationUserModel.sequelize.escape(
        `%${search}%`
      );
      whereClause[Op.or] = [
        { name: { [Op.iLike]: '%' + search + '%' } },
        { phoneNumber: { [Op.iLike]: '%' + search + '%' } },
        this.organizationUserModel.sequelize.Sequelize.literal(
          `CAST("OrganizationUserModel"."id" AS TEXT) ILIKE ${escapedSearch}`
        )
      ];
    }

    const result = await this.organizationUserModel.findAndCountAll({
      where: whereClause,
      include: {
        model: this.organizationUserBusinessOutletModel,
        as: 'organizationUserBusinessOutlets',
        where: {
          businessOutletId: {
            [Op.in]: currentOrganizationUserBusinessOutlets.map(
              organizationUserBusinessOutlet =>
                organizationUserBusinessOutlet.businessOutletId
            )
          },
          roles: {
            [Op.or]: [
              { [Op.contains]: [OrganizationUserRole.OUTLET_EMPLOYEE_ORDER] },
              { [Op.contains]: [OrganizationUserRole.OUTLET_EMPLOYEE_QC] }
            ]
          }
        }
      },
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: disabledPagination ? undefined : pageSize,
      offset: disabledPagination ? undefined : pageSize * page
    });

    return {
      organizationUsers: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findOutletEmployee(
    dto: OrganizationUserGetDetailRequest
  ): Promise<OrganizationUserModel> {
    const { id, currentUserId } = dto;
    const currentOrganizationUserBusinessOutlets = await this.findAllByRoleAndOrganizationUserId(
      {
        role: OrganizationUserRole.OUTLET_OWNER,
        organizationUserId: currentUserId
      }
    );
    if (currentOrganizationUserBusinessOutlets.length === 0) {
      throw new Error(
        'User yang saat ini digunakan untuk login tidak memiliki akses sebagai outlet owner'
      );
    }

    const organizationUser = await this.organizationUserModel.findByPk(id, {
      include: [
        {
          model: this.businessModel
        },
        {
          model: this.businessOutletModel,
          as: 'businessOutlets'
        },
        {
          model: this.organizationUserBusinessOutletModel,
          as: 'organizationUserBusinessOutlets',
          where: {
            businessOutletId: {
              [Op.in]: currentOrganizationUserBusinessOutlets.map(
                organizationUserBusinessOutlet =>
                  organizationUserBusinessOutlet.businessOutletId
              )
            },
            roles: {
              [Op.or]: [
                { [Op.contains]: [OrganizationUserRole.OUTLET_EMPLOYEE_ORDER] },
                { [Op.contains]: [OrganizationUserRole.OUTLET_EMPLOYEE_QC] }
              ]
            }
          }
        }
      ]
    });

    return organizationUser;
  }

  public async createOutletEmployee(
    dto: OrganizationUserCreateOutletEmployeeRequest
  ): Promise<OrganizationUserModel> {
    let transaction;
    try {
      const organization = await this.organizationModel.findOne({
        where: { name: 'TKB' }
      });

      const phoneNumberTaken = await this.organizationUserModel.findOne({
        where: {
          phoneNumber: dto.phoneNumber
        }
      });

      if (phoneNumberTaken) {
        throw new Error('Nomor HP telah digunakan');
      }

      transaction = await this.organizationUserModel.sequelize.transaction();
      const organizationUser = await this.organizationUserModel.create<
        OrganizationUserModel
      >(
        {
          ...dto,
          status: 'active',
          organizationId: organization.id
        },
        { transaction }
      );

      const promises = [];
      dto.businessOutletIds.forEach(businessOutletId => {
        promises.push(
          this.organizationUserBusinessOutletModel.create(
            {
              organizationUserId: organizationUser.id,
              businessOutletId: businessOutletId,
              status: 'active',
              roles: dto.roles,
              createdBy: dto.createdBy,
              updatedBy: dto.updatedBy
            },
            { transaction }
          )
        );
      });
      await Promise.all(promises);

      await transaction.commit();

      return organizationUser;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  }

  public async updateOutletEmployee(
    dto: OrganizationUserUpdateOutletEmployeeRequest
  ): Promise<OrganizationUserModel> {
    let transaction;
    try {
      const { id } = dto;

      const phoneNumberTaken = await this.organizationUserModel.findOne({
        where: {
          phoneNumber: dto.phoneNumber,
          id: { [Op.ne]: id }
        }
      });

      if (phoneNumberTaken) {
        throw new Error('Nomor HP telah terdaftar');
      }

      const organizationUser = await this.findById(id);

      // get existing business outlet
      const existingOrganizationUserBusinessOutlets = await this.organizationUserBusinessOutletModel.findAll(
        {
          where: {
            organizationUserId: id
          }
        }
      );
      const existingBusinessOutletIds = existingOrganizationUserBusinessOutlets.map(
        data => data.businessOutletId
      );
      const listCreateBusinessOutletIds = dto.businessOutletIds.filter(
        businessOutletId =>
          !existingBusinessOutletIds.includes(businessOutletId)
      );
      const listUpdateBusinessOutletIds = dto.businessOutletIds.filter(
        businessOutletId => existingBusinessOutletIds.includes(businessOutletId)
      );
      const listDeleteBusinessOutletIds = existingBusinessOutletIds.filter(
        businessOutletId => !dto.businessOutletIds.includes(businessOutletId)
      );

      transaction = await this.organizationUserModel.sequelize.transaction();

      const updatedOrganizationUser = await organizationUser.update(dto, {
        transaction
      });

      const createPromises = [];
      listCreateBusinessOutletIds.forEach(businessOutletId => {
        createPromises.push(
          this.organizationUserBusinessOutletModel.create(
            {
              organizationUserId: organizationUser.id,
              businessOutletId: businessOutletId,
              status: 'active',
              roles: dto.roles,
              createdBy: dto.updatedBy,
              updatedBy: dto.updatedBy
            },
            { transaction }
          )
        );
      });
      await Promise.all(createPromises);

      const updatePromises = [];
      listUpdateBusinessOutletIds.forEach(businessOutletId => {
        updatePromises.push(
          this.organizationUserBusinessOutletModel.update(
            {
              roles: dto.roles,
              updatedBy: dto.updatedBy
            },
            {
              where: {
                businessOutletId: businessOutletId,
                organizationUserId: organizationUser.id
              },
              transaction
            }
          )
        );
      });
      await Promise.all(updatePromises);

      const deletePromises = [];
      listDeleteBusinessOutletIds.forEach(businessOutletId => {
        deletePromises.push(
          this.organizationUserBusinessOutletModel.destroy({
            where: {
              organizationUserId: organizationUser.id,
              businessOutletId: businessOutletId
            },
            transaction
          })
        );
      });
      await Promise.all(deletePromises);

      await transaction.commit();

      return updatedOrganizationUser;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  }

  public async deleteOutletEmployee(id: string): Promise<Boolean> {
    let transaction;
    try {
      const organizationUserBusinesses = await this.organizationUserBusinessModel.findAll(
        {
          where: {
            organizationUserId: id
          }
        }
      );

      const businessOutletLeads = await this.businessOutletLeadModel.findAll({
        where: {
          organizationUserId: id
        }
      });

      const organizationUserBusinessOutlets = await this.organizationUserBusinessOutletModel.findAll(
        {
          where: {
            organizationUserId: id
          }
        }
      );

      transaction = await this.organizationUserModel.sequelize.transaction();

      if (organizationUserBusinesses.length) {
        const promises: Promise<
          void
        >[] = organizationUserBusinesses.map(organizationUserBusiness =>
          organizationUserBusiness.destroy({ transaction })
        );
        await Promise.all(promises);
      }

      if (businessOutletLeads.length) {
        const promises: Promise<
          void
        >[] = businessOutletLeads.map(businessOutletLead =>
          businessOutletLead.destroy({ transaction })
        );
        await Promise.all(promises);
      }

      if (organizationUserBusinessOutlets.length) {
        const promises: Promise<
          void
        >[] = organizationUserBusinessOutlets.map(
          organizationUserBusinessOutlet =>
            organizationUserBusinessOutlet.destroy({ transaction })
        );
        await Promise.all(promises);
      }

      await this.organizationUserModel.destroy({ where: { id }, transaction });
      await transaction.commit();

      return true;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  }
}
