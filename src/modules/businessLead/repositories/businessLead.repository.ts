import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  BusinessModel,
  BusinessInformationCategoriesModel,
  BusinessLeadModel,
  BusinessLeadLogModel
} from '@wahyoo/wahyoo-shared';
import {
  BusinessLeadStatus,
  BusinessLeadRequirementStatus
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Op } from 'sequelize';
import { BusinessLeadUpdateRequest } from '../dto/businessLeadUpdateRequest.dto';
import { BusinessLeadCreateRequest } from '../dto/businessLeadCreateRequest.dto';
import { BusinessLeadClosedRequest } from '../dto/businessLeadClosedRequest.dto';
import { BusinessLeadGetListRequest } from '../dto/businessLeadGetListRequest.dto';
import {
  IBusinessLeadRepository,
  PagingBusinessLeadModel
} from './businessLead.interface';

@Injectable()
export class BusinessLeadRepository implements IBusinessLeadRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_MODEL)
    private readonly businessModel: typeof BusinessModel,
    @Inject(InjectionKey.BUSINESS_INFORMATION_CATEGORIES_MODEL)
    private readonly businessInformationCategoriesModel: typeof BusinessInformationCategoriesModel,
    @Inject(InjectionKey.BUSINESS_LEAD_MODEL)
    private readonly businessLeadModel: typeof BusinessLeadModel,
    @Inject(InjectionKey.BUSINESS_LEAD_LOG_MODEL)
    private readonly businessLeadLogModel: typeof BusinessLeadLogModel
  ) {}

  public async findAll(
    dto: BusinessLeadGetListRequest
  ): Promise<PagingBusinessLeadModel> {
    const { sortBy, page, pageSize, filter, search } = dto;
    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }

      if (filter.requirementStatus) {
        whereClause.requirementStatus = filter.requirementStatus;
      }

      if (filter.id) {
        whereClause.id = filter.id;
      }
      if (filter.businessId) {
        whereClause.businessId = filter.businessId;
      }
      if (filter.name) {
        whereClause.name = filter.name;
      }
    }

    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }
    const result = await this.businessLeadModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });

    const resultTotalUncompleted = await this.businessLeadModel.count({
      where: {
        status: { [Op.ne]: BusinessLeadStatus.closed },
        requirementStatus: { [Op.ne]: BusinessLeadRequirementStatus.full }
      }
    });

    return {
      totalUncompleted: resultTotalUncompleted,
      businessLeads: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(id: string): Promise<BusinessLeadModel> {
    return this.businessLeadModel.findOne({
      where: {
        id
      }
    });
  }

  public async create(
    dto: BusinessLeadCreateRequest
  ): Promise<BusinessLeadModel> {
    let transaction;
    try {
      transaction = await this.businessLeadModel.sequelize.transaction();
      const businessLead = await this.businessLeadModel.create<
        BusinessLeadModel
      >(dto, { transaction });

      await this.businessLeadLogModel.create(
        {
          ...dto,
          businessLeadId: businessLead.id
        },
        {
          transaction
        }
      );

      await transaction.commit();
      return businessLead;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async updateAsDraft(
    dto: BusinessLeadUpdateRequest
  ): Promise<BusinessLeadModel> {
    const { id } = dto;
    const existingBusinessLead = await this.findById(id);
    let transaction;
    try {
      transaction = await this.businessLeadModel.sequelize.transaction();
      const updatedBusinessLead = await existingBusinessLead.update(dto, {
        transaction
      });

      delete dto.id;

      await this.businessLeadLogModel.create(
        {
          ...dto,
          businessLeadId: id
        },
        {
          transaction
        }
      );

      await transaction.commit();
      return updatedBusinessLead;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async updateAsPublished(
    dto: BusinessLeadUpdateRequest
  ): Promise<BusinessLeadModel> {
    const { id } = dto;
    const existingBusinessLead = await this.findById(id);
    let transaction;
    try {
      transaction = await this.businessLeadModel.sequelize.transaction();
      const updatedBusinessLead = await existingBusinessLead.update(dto, {
        transaction
      });

      delete dto.id;

      await this.businessLeadLogModel.create(
        {
          ...dto,
          businessLeadId: id
        },
        {
          transaction
        }
      );

      await transaction.commit();
      return updatedBusinessLead;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async closedById(
    dto: BusinessLeadClosedRequest
  ): Promise<BusinessLeadModel> {
    const { id } = dto;
    const existingBusinessLead = await this.findById(id);
    let transaction;
    try {
      transaction = await this.businessLeadModel.sequelize.transaction();

      if (
        existingBusinessLead.status === BusinessLeadStatus.published &&
        existingBusinessLead.requirementStatus ===
          BusinessLeadRequirementStatus.full
      ) {
        await this.businessModel.update(
          { isHiddenToPublic: true },
          {
            where: { id: existingBusinessLead.businessId },
            transaction
          }
        );

        await this.businessInformationCategoriesModel.destroy({
          where: { businessId: existingBusinessLead.businessId },
          transaction
        });
      }

      const updatedBusinessLead = await existingBusinessLead.update(dto, {
        transaction
      });

      await transaction.commit();
      return updatedBusinessLead;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async findByBusinessIds(ids: string[]): Promise<BusinessLeadModel[]> {
    return await this.businessLeadModel.findAll({
      where: {
        businessId: {
          [Op.in]: ids
        }
      }
    });
  }
}
