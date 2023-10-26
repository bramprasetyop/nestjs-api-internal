import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  BusinessOutletDailyFinanceReportModel,
  BusinessOutletModel,
  BusinessOutletPropertyModel,
  InjectionKey,
  OrganizationUserModel
} from '@wahyoo/wahyoo-shared';
import { BusinessOutletDailyFinanceReportGetListRequest } from '../dto/businessOutletDailyFinanceReportGetListRequest.dto';
import {
  IBusinessOutletDailyFinanceReportRepository,
  PagingBusinessOutletDailyFinanceReportModel
} from './businessOutletDailyFinanceReport.interface';
import {
  IOrganizationUserDailyFeeAssignmentRepository,
  PagingOrganizationUserDailyFeeAssignmentModel
} from './organizationUserDailyFeeAssignment.interface';
import { OrganizationUserDailyFeeAssignmentGetListRequest } from '../dto/organizationUserDailyFeeAssignmentGetListRequest.dto';
import { BusinessOutletProperty } from 'src/modules/businessOutletProperty/dto/businessOutletProperty.dto';
import { OrganizationUserDailyFeeAssignmentUpdateRequest } from '../dto/organizationUserDailyFeeAssignmentUpdateRequest.dto';

@Injectable()
export class OrganizationUserDailyFeeAssignmentRepository
  implements IOrganizationUserDailyFeeAssignmentRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_USER_MODEL)
    private readonly organizationUserModel: typeof OrganizationUserModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL)
    private readonly businessOutletPropertyModel: typeof BusinessOutletPropertyModel
  ) {}

  async findAll(
    dto: OrganizationUserDailyFeeAssignmentGetListRequest
  ): Promise<PagingOrganizationUserDailyFeeAssignmentModel> {
    const { sortBy, page, pageSize, filter, search } = dto;
    const whereClause: any = {};
    const includeClause: any = [];

    if (filter && Object.keys(filter).length > 0) {
      if (filter.organizationUserId) {
        whereClause.id = filter.organizationUserId;
      }
      if (filter.businessOutletId) {
        includeClause.push({
          model: BusinessOutletModel,
          as: 'businessOutlets',
          where: {
            id: filter.businessOutletId
          }
        });
      }
    }

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }

    const result = await this.organizationUserModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page,
      include: includeClause
    });
    return {
      organizationUserDailyFeeAssignment: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }
  async findById(id: string): Promise<OrganizationUserModel> {
    return this.organizationUserModel.findByPk(id);
  }

  async countBusinessOutletByOrganizationUserId(id: string): Promise<Number> {
    return this.businessOutletPropertyModel.count({
      where: {
        dailyTransferOrganizationUserId: id
      }
    });
  }

  async update(
    dto: OrganizationUserDailyFeeAssignmentUpdateRequest
  ): Promise<OrganizationUserModel> {
    const { dailyTransferFee, organizationUserId } = dto;
    const updatedData = await this.organizationUserModel.update(
      {
        dailyTransferFee
      },
      {
        where: {
          id: organizationUserId
        },
        returning: true
      }
    );
    return updatedData[1][0];
  }
}
