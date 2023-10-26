import moment from 'moment';
import { Sequelize, Op } from 'sequelize';
import { IUseCase } from 'src/commons/useCase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TransferDailyFinanceReportUnprocessedRequest } from '../dto/transferDailyFinanceReportRequest.dto';
import {
  BusinessOutletModel,
  InjectionKey,
  OrganizationUserDailyFeeReportModel,
  OrganizationUserDailyFinanceReportModel,
  OrganizationUserModel,
  RabbitMQProducerService,
  RabbitMQQueueName,
  XOrganizationUserWahyooUserModel
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class TransferDailyFinanceReportUnprocessedUseCase implements IUseCase {
  private sequelize: Sequelize;
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    @Inject(InjectionKey.ORGANIZATION_USER_DAILY_FINANCE_REPORT_MODEL)
    private readonly organizationUserDailyFinanceReportModel: typeof OrganizationUserDailyFinanceReportModel
  ) {
    this.sequelize = this.organizationUserDailyFinanceReportModel.sequelize;
  }

  async execute(dto: TransferDailyFinanceReportUnprocessedRequest) {
    try {
      // by default, startDate = 7 days ago, endDate = yesterday
      let startDate = moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD');
      let endDate = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
      let onlyForOrganizationUserIds = [];
      let excludeForOrganizationUserIds = [];

      if (dto.startDate) {
        const isValidDate = moment(startDate, 'YYYY-MM-DD', true).isValid();
        if (!isValidDate) {
          throw Error(`startDate not valid should have format 'YYYY-MM-DD'`);
        }
        startDate = dto.startDate;
      }

      if (dto.endDate) {
        const isValidDate = moment(endDate, 'YYYY-MM-DD', true).isValid();
        if (!isValidDate) {
          throw Error(`endDate not valid should have format 'YYYY-MM-DD'`);
        }
        endDate = dto.endDate;
      }

      if (
        dto.onlyForOrganizationUserIds &&
        Array.isArray(dto.onlyForOrganizationUserIds)
      ) {
        onlyForOrganizationUserIds = dto.onlyForOrganizationUserIds;
      }

      if (
        dto.excludeForOrganizationUserIds &&
        Array.isArray(dto.excludeForOrganizationUserIds)
      ) {
        excludeForOrganizationUserIds = dto.excludeForOrganizationUserIds;
      }

      const todayDate = moment().format('YYYY-MM-DD');

      for (
        let day = startDate;
        moment(day).isSameOrBefore(endDate);
        day = moment(day)
          .add(1, 'days')
          .format('YYYY-MM-DD')
      ) {
        const whereClauseDailyFinance: any = {
          isUnprocessed: true,
          day,
          _amountToBeTransferred: {
            [Op.gt]: 0
          },
          [Op.and]: [
            this.sequelize.Sequelize.literal(
              `DATE("OrganizationUserDailyFinanceReportModel"."created_at")='${todayDate}'
              `
            )
          ]
        };

        // exclude specific ids on array onlyForOrganizationUserIds
        if (
          onlyForOrganizationUserIds.length > 0 &&
          excludeForOrganizationUserIds.length > 0
        ) {
          onlyForOrganizationUserIds = onlyForOrganizationUserIds.filter(
            id => !excludeForOrganizationUserIds.includes(id)
          );
        }

        if (onlyForOrganizationUserIds.length > 0) {
          whereClauseDailyFinance.organizationUserId = {
            [Op.in]: onlyForOrganizationUserIds
          };
        } else if (excludeForOrganizationUserIds.length > 0) {
          whereClauseDailyFinance.organizationUserId = {
            [Op.notIn]: excludeForOrganizationUserIds
          };
        }

        const organizationUserDailyFinanceReports = await this.organizationUserDailyFinanceReportModel.findAll(
          {
            where: whereClauseDailyFinance,
            order: [['unprocessedNumber', 'DESC']],
            include: [
              {
                required: true,
                model: OrganizationUserModel,
                as: 'organizationUser',
                include: [
                  {
                    required: true,
                    model: XOrganizationUserWahyooUserModel,
                    as: 'xOrganizationUserWahyooUser'
                  },
                  {
                    model: BusinessOutletModel,
                    as: 'businessOutlets'
                  }
                ]
              }
            ]
          }
        );

        console.log(JSON.stringify(organizationUserDailyFinanceReports));
        if (organizationUserDailyFinanceReports.length > 0) {
          await this.rabbitMQProducerService.publishToQueue({
            queueName:
              RabbitMQQueueName.PAYMENT_ADJUSTMENT_REQUEST_CREATE_QUEUE_FIFO,
            data: {
              type: 'daily_finance_unprocessed',
              organizationUserDailyFinanceReports
            }
          });
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
