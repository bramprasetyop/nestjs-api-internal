import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  BusinessOutletModel,
  BusinessOutletPropertyModel,
  BusinessOutletStatus,
  InjectionKey,
  OrganizationUserBusinessOutletModel,
  XBusinessOutletKioskModel,
  BusinessOutletLeadModel,
  XHubsterStoreModel
} from '@wahyoo/wahyoo-shared';
import {
  IBusinessOutletRepository,
  PagingBusinessOutletModel
} from './businessOutlet.interface';
import {
  BusinessOutletGetListRequest,
  FilterBusinessOutletStatus
} from '../dto/businessOutletGetListRequest.dto';
import { BusinessOutletCreateRequest } from '../dto/businessOutletCreateRequest.dto';
import { BusinessOutletUpdateRequest } from '../dto/businessOutletUpdateRequest.dto';
import { BusinessOutletAndPropertyUpdateRequest } from '../dto/businessOutletAndPropertyUpdateRequest.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class BusinessOutletRepository implements IBusinessOutletRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_MODEL)
    private readonly businessOutletModel: typeof BusinessOutletModel,
    @Inject(InjectionKey.X_BUSINESS_OUTLET_KIOSK_MODEL)
    private readonly xBusinessOutletKioskModel: typeof XBusinessOutletKioskModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MODEL)
    private readonly businessOutletLeadModel: typeof BusinessOutletLeadModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL)
    private readonly businessOutletPropertyModel: typeof BusinessOutletPropertyModel,
    @Inject(InjectionKey.X_HUBSTER_STORE_MODEL)
    private readonly xHubsterStoreModel: typeof XHubsterStoreModel
  ) {}
  findAllByBusinessId(businessId: string): Promise<BusinessOutletModel[]> {
    return this.businessOutletModel.findAll({
      where: {
        businessId,
        status: BusinessOutletStatus.active
      }
    });
  }
  async findAll(
    dto: BusinessOutletGetListRequest
  ): Promise<PagingBusinessOutletModel> {
    const {
      sortBy,
      page,
      pageSize,
      filter,
      search,
      businessOutletIds = [],
      disabledPagination
    } = dto;
    const whereClause: any = {};
    let includeClause = [];

    if (filter && Object.keys(filter).length > 0) {
      if (filter.status && filter.status !== FilterBusinessOutletStatus.all) {
        whereClause.status = filter.status;
      }
      if (typeof filter.posAvailable === 'boolean') {
        whereClause.posAvailable = filter.posAvailable;
      }
      if (filter.isUnassignedToHubsterStore === true) {
        includeClause = [
          {
            required: false,
            model: XHubsterStoreModel,
            as: 'xHubsterStores'
          }
        ];
      }
      if (filter.tkbRegion) {
        whereClause.tkbRegion = filter.tkbRegion;
      }
      if (filter.createdAt) {
        whereClause[Op.and] = [];
        if (filter.createdAt.startDate) {
          whereClause[Op.and].push({
            createdAt: { [Op.gte]: filter.createdAt.startDate }
          });
        }
        if (filter.createdAt.endDate) {
          whereClause[Op.and].push({
            createdAt: { [Op.lte]: filter.createdAt.endDate }
          });
        }
      }
    }

    if (dto.businessId) {
      whereClause.businessId = dto.businessId;
    }

    if (dto.businessOutletIds) {
      whereClause.id = { [Op.in]: businessOutletIds };
    }

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: '%' + search + '%' } },
        { code: { [Op.iLike]: '%' + search + '%' } }
      ];
    }
    const result = await this.businessOutletModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: disabledPagination ? undefined : pageSize,
      offset: disabledPagination ? undefined : pageSize * page,
      include: includeClause
    });

    if (filter.isUnassignedToHubsterStore === true) {
      result.rows = result.rows.filter(
        business => business.xHubsterStores.length === 0
      );
    }

    return {
      businessOutlets: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  async findByCode(code: string) {
    return this.businessOutletModel.findOne({
      where: {
        code
      }
    });
  }

  async findAllByXWahyooKioskIds(
    xWahyooKioskIds: number[]
  ): Promise<BusinessOutletModel[]> {
    const businessOutlets = await this.businessOutletModel.findAll({
      where: {
        status: BusinessOutletStatus.active
      },
      include: [
        {
          model: XBusinessOutletKioskModel,
          where: {
            xWahyooKioskId: {
              [Op.in]: xWahyooKioskIds
            }
          }
        }
      ]
    });
    return businessOutlets;
  }

  async findById(id: string): Promise<BusinessOutletModel> {
    return this.businessOutletModel.findByPk(id);
  }

  async findByOrganizationUser(
    organizationUserId: string
  ): Promise<BusinessOutletModel[]> {
    return this.businessOutletModel.findAll({
      where: {
        status: BusinessOutletStatus.active
      },
      include: [
        {
          model: OrganizationUserBusinessOutletModel,
          where: {
            organizationUserId
          }
        }
      ]
    });
  }

  async findByIds(ids: string[]): Promise<BusinessOutletModel[]> {
    return this.businessOutletModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      },
      include: [
        {
          model: OrganizationUserBusinessOutletModel
        }
      ]
    });
  }

  public async create(
    dto: BusinessOutletCreateRequest
  ): Promise<BusinessOutletModel> {
    const { xWahyooKioskId, xHubsterStores } = dto;
    let transaction;
    try {
      transaction = await this.businessOutletModel.sequelize.transaction();
      const businessOutlet = await this.businessOutletModel.create<
        BusinessOutletModel
      >(dto, { transaction });
      if (xWahyooKioskId) {
        await this.xBusinessOutletKioskModel.create(
          {
            xWahyooKioskId,
            businessOutletId: businessOutlet.id
          },
          { transaction }
        );
      }

      // unassign
      await this.xHubsterStoreModel.update(
        {
          businessOutletId: null
        },
        {
          where: { businessOutletId: businessOutlet.id },
          transaction
        }
      );

      // reassign
      const promises = [];
      xHubsterStores.forEach(xHubsterStore => {
        promises.push(
          this.xHubsterStoreModel.update(
            {
              businessOutletId: businessOutlet.id,
              isDineIn: xHubsterStore.isDineIn
            },
            {
              where: { id: xHubsterStore.xHubsterStoreId },
              transaction
            }
          )
        );
      });
      await Promise.all(promises);

      await transaction.commit();
      return businessOutlet;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async update(
    dto: BusinessOutletUpdateRequest
  ): Promise<BusinessOutletModel> {
    const { id, xWahyooKioskId, xHubsterStores } = dto;
    let transaction;
    try {
      const businessOutlet = await this.findById(id);
      const xBusinessOutletKiosk = await this.xBusinessOutletKioskModel.findOne(
        { where: { businessOutletId: id } }
      );
      transaction = await this.businessOutletModel.sequelize.transaction();
      const updatedBusinessOutlet = await businessOutlet.update(dto, {
        transaction
      });

      if (xBusinessOutletKiosk) {
        await xBusinessOutletKiosk.update(
          { xWahyooKioskId: xWahyooKioskId },
          { transaction }
        );
      }

      if (!xBusinessOutletKiosk && xWahyooKioskId) {
        await this.xBusinessOutletKioskModel.create(
          {
            xWahyooKioskId,
            businessOutletId: businessOutlet.id
          },
          { transaction }
        );
      }

      // unassign
      await this.xHubsterStoreModel.update(
        {
          businessOutletId: null,
          isDineIn: false
        },
        {
          where: { businessOutletId: businessOutlet.id },
          transaction
        }
      );

      // reassign
      const promises = [];
      xHubsterStores.forEach(xHubsterStore => {
        promises.push(
          this.xHubsterStoreModel.update(
            {
              businessOutletId: businessOutlet.id,
              isDineIn: xHubsterStore.isDineIn
            },
            {
              where: { id: xHubsterStore.xHubsterStoreId },
              transaction
            }
          )
        );
      });
      await Promise.all(promises);

      await transaction.commit();
      return updatedBusinessOutlet;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  }

  public async businessOutletAndPropertyUpdate(
    dto: BusinessOutletAndPropertyUpdateRequest
  ) {
    const { businessOutletDto, businessOutletPropertyDto } = dto;
    let transaction: Transaction = null;

    try {
      const { id, xWahyooKioskId, xHubsterStores } = dto.businessOutletDto;

      const businessOutletLead = await this.businessOutletLeadModel.findOne({
        where: {
          businessOutletId: id
        }
      });

      const businessOutletProperty = await this.businessOutletPropertyModel.findOne(
        {
          where: { businessOutletId: id, deletedAt: null }
        }
      );

      const businessOutlet = await this.findById(id);
      const xBusinessOutletKiosk = await this.xBusinessOutletKioskModel.findOne(
        { where: { businessOutletId: id } }
      );

      transaction = await this.businessOutletModel.sequelize.transaction();

      // Update business outlet lead if exists
      if (businessOutletLead) {
        await businessOutletLead.update(
          {
            ktpNumber: businessOutletDto.ktpNumber,
            bankAccountName: businessOutletDto.bankAccountName,
            bankAccountNumber: businessOutletDto.bankAccountNumber,
            bankAccountProviderName: businessOutletDto.bankAccountProviderName
          },
          { transaction }
        );
      }

      // Update business outlet property if exists, otherwise create a new one
      if (businessOutletProperty) {
        await businessOutletProperty.update(businessOutletPropertyDto, {
          transaction
        });
      } else {
        await this.businessOutletPropertyModel.create(
          {
            ...businessOutletPropertyDto,
            businessOutletId: id
          },
          { transaction }
        );
      }

      const updatedBusinessOutlet = await businessOutlet.update(
        businessOutletDto,
        {
          transaction
        }
      );

      if (xBusinessOutletKiosk) {
        await xBusinessOutletKiosk.update(
          { xWahyooKioskId: xWahyooKioskId },
          { transaction }
        );
      }

      if (!xBusinessOutletKiosk && xWahyooKioskId) {
        await this.xBusinessOutletKioskModel.create(
          {
            xWahyooKioskId,
            businessOutletId: businessOutlet.id
          },
          { transaction }
        );
      }

      // unassign
      await this.xHubsterStoreModel.update(
        {
          businessOutletId: null,
          isDineIn: false
        },
        {
          where: { businessOutletId: businessOutlet.id },
          transaction
        }
      );

      // reassign
      const promises = [];

      if (xHubsterStores) {
        xHubsterStores.forEach(xHubsterStore => {
          promises.push(
            this.xHubsterStoreModel.update(
              {
                businessOutletId: businessOutlet.id,
                isDineIn: xHubsterStore.isDineIn
              },
              {
                where: { id: xHubsterStore.xHubsterStoreId },
                transaction
              }
            )
          );
        });
        await Promise.all(promises);
      }

      await transaction.commit();

      return updatedBusinessOutlet;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  }

  public async delete(id: string): Promise<Boolean> {
    const res = await this.businessOutletModel.destroy({ where: { id } });
    return res > 0;
  }
}
