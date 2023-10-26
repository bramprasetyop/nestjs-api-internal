import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  InjectionKey,
  OrganizationUserDailyFinanceReportModel,
  OrganizationUserModel,
  XWahyooPaymentAdjustmentRequestDetailModel
} from '@wahyoo/wahyoo-shared';
import { OrganizationUserDailyFinanceReportGetListRequest } from '../dto/organizationUserDailyFinanceReportGetListRequest.dto';
import {
  IOrganizationUserDailyFinanceReportRepository,
  PagingOrganizationUserDailyFinanceReportModel
} from './organizationUserDailyFinanceReport.interface';
import moment from 'moment';

@Injectable()
export class OrganizationUserDailyFinanceReportRepository
  implements IOrganizationUserDailyFinanceReportRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_USER_DAILY_FINANCE_REPORT_MODEL)
    private readonly organizationUserDailyFinanceReportModel: typeof OrganizationUserDailyFinanceReportModel
  ) {}
  async findAll(
    dto: OrganizationUserDailyFinanceReportGetListRequest
  ): Promise<PagingOrganizationUserDailyFinanceReportModel> {
    const { sortBy, page, pageSize, filter, search, disabledPagination } = dto;
    const whereClause: any = {};
    const includeClause: any = [];

    if (filter && Object.keys(filter).length > 0) {
      if (filter.organizationUserId) {
        whereClause.organizationUserId = filter.organizationUserId;
      }
      if (filter.paymentStatus) {
        includeClause.push({
          required: true,
          model: XWahyooPaymentAdjustmentRequestDetailModel,
          as: 'xWahyooPaymentAdjustmentRequestDetail',
          where: { xPaymentAdjustmentRequestStatus: filter.paymentStatus }
        });
      }
      if (filter.period) {
        whereClause[Op.and] = [];
        if (filter.period.startDate) {
          whereClause[Op.and].push({
            day: {
              [Op.gte]: moment(filter.period.startDate).format('YYYY-MM-DD')
            }
          });
        }
        if (filter.period.endDate) {
          whereClause[Op.and].push({
            day: {
              [Op.lte]: moment(filter.period.endDate).format('YYYY-MM-DD')
            }
          });
        }
      }
      if ('isUnprocessed' in filter) {
        whereClause.isUnprocessed = filter.isUnprocessed;
      }
    }

    if (search) {
      includeClause.push({
        required: true,
        model: OrganizationUserModel,
        as: 'organizationUser',
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: '%' + search + '%' } },
            { phoneNumber: { [Op.iLike]: '%' + search + '%' } }
          ]
        }
      });
    }

    const result = await this.organizationUserDailyFinanceReportModel.findAndCountAll(
      {
        where: whereClause,
        order: [[sortBy.columnName, sortBy.sortOrder]],
        limit: disabledPagination ? undefined : pageSize,
        offset: disabledPagination ? undefined : pageSize * page,
        include: includeClause
      }
    );
    return {
      organizationUserDailyFinanceReports: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }
  async findById(id: string): Promise<OrganizationUserDailyFinanceReportModel> {
    return this.organizationUserDailyFinanceReportModel.findByPk(id);
  }
}
