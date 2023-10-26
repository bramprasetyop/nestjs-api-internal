import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  InjectionKey,
  BusinessOutletQualityControlModel,
  BusinessOutletQualityControlLogModel,
  BusinessOutletModel,
  BusinessOutletQualityControlStatus
} from '@wahyoo/wahyoo-shared';
import { Op, Sequelize } from 'sequelize';
import { BusinessOutletQualityControlGetListRequest } from '../dto/businessOutletQualityControlGetListRequest.dto';
import { BusinessOutletQualityControlSubmitRequest } from '../dto/businessOutletQualityControlSubmitRequest.dto';
import { BusinessOutletQualityControlUpdateRequest } from '../dto/businessOutletQualityControlUpdateRequest.dto';
import {
  IBusinessOutletQualityControlRepository,
  markAsReviewedInput,
  PagingBusinessOutletQualityControlModel
} from './businessOutletQualityControl.interface';

@Injectable()
export class BusinessOutletQualityControlRepository
  implements IBusinessOutletQualityControlRepository {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_QUALITY_CONTROL_MODEL)
    private readonly businessOutletQualityControlModel: typeof BusinessOutletQualityControlModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_QUALITY_CONTROL_LOG_MODEL)
    private readonly businessOutletQualityControlLogModel: typeof BusinessOutletQualityControlLogModel
  ) {
    this.sequelize = this.businessOutletQualityControlModel.sequelize;
  }

  async findById(id: string): Promise<BusinessOutletQualityControlModel> {
    return this.businessOutletQualityControlModel.findByPk(id);
  }

  async findAll(
    dto: BusinessOutletQualityControlGetListRequest
  ): Promise<PagingBusinessOutletQualityControlModel> {
    const { sortBy, page, pageSize, filter, search, disabledPagination } = dto;
    const whereClause: any = {};
    const includeClause: any = [];

    if (filter && Object.keys(filter).length > 0) {
      if (filter.organizationUserId) {
        whereClause.organizationUserId = filter.organizationUserId;
      }
      if (filter.businessId) {
        whereClause.businessId = filter.businessId;
      }
      if (filter.businessOutletId) {
        whereClause.businessOutletId = filter.businessOutletId;
      }
      if (filter.businessOutletIds) {
        whereClause.businessOutletId = {
          [Op.in]: filter.businessOutletIds
        };
      }
      if (filter.status) {
        whereClause.status = {
          [Op.in]: filter.status
        };
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

    if (search) {
      includeClause.push({
        required: true,
        model: BusinessOutletModel,
        as: 'businessOutlet',
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: '%' + search + '%' } },
            { code: { [Op.iLike]: '%' + search + '%' } }
          ]
        }
      });
    }
    const result = await this.businessOutletQualityControlModel.findAndCountAll(
      {
        where: whereClause,
        order: [[sortBy.columnName, sortBy.sortOrder]],
        limit: disabledPagination ? undefined : pageSize,
        offset: disabledPagination ? undefined : pageSize * page,
        include: includeClause
      }
    );

    return {
      businessOutletQualityControls: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  async countStatusAggregate(
    businessId: string
  ): Promise<BusinessOutletQualityControlModel[]> {
    return await this.businessOutletQualityControlModel.findAll({
      attributes: [
        'status',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalStatus']
      ],
      where: { businessId },
      group: 'status'
    });
  }

  async update(
    dto: BusinessOutletQualityControlUpdateRequest
  ): Promise<BusinessOutletQualityControlModel> {
    let transaction;
    try {
      const { id, status, reviewedBy } = dto;
      const businessOutletQualityControl = await this.businessOutletQualityControlModel.findByPk(
        id
      );
      if (!businessOutletQualityControl) {
        throw new NotFoundException(id);
      }
      transaction = await this.sequelize.transaction();

      await businessOutletQualityControl.update(dto, {
        transaction
      });
      await this.businessOutletQualityControlLogModel.create(
        {
          businessOutletQualityControlId: id,
          status,
          reviewedBy
        },
        {
          transaction
        }
      );

      await transaction.commit();
      return businessOutletQualityControl;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw new Error('cannot update business outlet qc');
    }
  }

  async submit(
    dto: BusinessOutletQualityControlSubmitRequest
  ): Promise<BusinessOutletQualityControlModel> {
    let transaction;
    try {
      const { id, qcResponseJson } = dto;
      const businessOutletQualityControl = await this.businessOutletQualityControlModel.findByPk(
        id
      );
      if (!businessOutletQualityControl) {
        throw new NotFoundException(id);
      }
      transaction = await this.sequelize.transaction();

      await businessOutletQualityControl.update(
        {
          qcResponseJson: JSON.parse(qcResponseJson),
          status: BusinessOutletQualityControlStatus.waiting_review,
          submittedAt: Date.now()
        },
        {
          transaction
        }
      );
      await this.businessOutletQualityControlLogModel.create(
        {
          businessOutletQualityControlId: id,
          status: BusinessOutletQualityControlStatus.waiting_review
        },
        {
          transaction
        }
      );

      await transaction.commit();
      return businessOutletQualityControl;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw new Error('cannot update business outlet qc');
    }
  }

  async markAsReviewed(
    dto: markAsReviewedInput
  ): Promise<BusinessOutletQualityControlModel> {
    let transaction;
    try {
      const { id, reviewedBy } = dto;
      const businessOutletQualityControl = await this.businessOutletQualityControlModel.findByPk(
        id
      );
      if (!businessOutletQualityControl) {
        throw new NotFoundException(id);
      }
      transaction = await this.sequelize.transaction();

      await businessOutletQualityControl.update(
        {
          status: BusinessOutletQualityControlStatus.reviewed,
          reviewedBy
        },
        {
          transaction
        }
      );
      await this.businessOutletQualityControlLogModel.create(
        {
          businessOutletQualityControlId: id,
          status: BusinessOutletQualityControlStatus.reviewed,
          reviewedBy
        },
        {
          transaction
        }
      );

      await transaction.commit();
      return businessOutletQualityControl;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw new Error('cannot update business outlet qc');
    }
  }
}
