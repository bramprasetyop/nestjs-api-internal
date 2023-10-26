import moment from 'moment';
import { Op } from 'sequelize';
import { IUseCase } from 'src/commons/useCase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TransferDailyFinanceReportRequest } from '../dto/transferDailyFinanceReportRequest.dto';
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
export class TransferDailyFinanceReportUseCase implements IUseCase {
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    @Inject(InjectionKey.ORGANIZATION_USER_DAILY_FINANCE_REPORT_MODEL)
    private readonly organizationUserDailyFinanceReportModel: typeof OrganizationUserDailyFinanceReportModel,
    @Inject(InjectionKey.ORGANIZATION_USER_DAILY_FEE_REPORT_MODEL)
    private readonly organizationUserDailyFeeReportModel: typeof OrganizationUserDailyFeeReportModel
  ) {}

  async execute(dto: TransferDailyFinanceReportRequest) {
    try {
      // currentDate should have format 'YYYY-MM-DD'
      let {
        currentDate,
        onlyForOrganizationUserIds,
        excludeForOrganizationUserIds
      } = dto;
      if (currentDate) {
        const isValidDate = moment(currentDate, 'YYYY-MM-DD', true).isValid();
        if (!isValidDate) {
          throw Error(`currentDate not valid should have format 'YYYY-MM-DD'`);
        }
      }

      // will request daily transfer for yesterday or H-1
      if (!currentDate) {
        currentDate = moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD');
      }

      if (
        !onlyForOrganizationUserIds ||
        (onlyForOrganizationUserIds &&
          !Array.isArray(onlyForOrganizationUserIds))
      ) {
        onlyForOrganizationUserIds = [];
      }

      if (
        !excludeForOrganizationUserIds ||
        (excludeForOrganizationUserIds &&
          !Array.isArray(excludeForOrganizationUserIds))
      ) {
        excludeForOrganizationUserIds = [];
      }

      const whereClauseDailyFinance: any = {
        isUnprocessed: false,
        day: currentDate,
        _amountToBeTransferred: {
          [Op.gt]: 0
        }
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

      const whereClauseDailyFee: any = {
        day: currentDate,
        _dailyTransferFee: {
          [Op.gt]: 0
        }
      };
      if (onlyForOrganizationUserIds.length > 0) {
        whereClauseDailyFee.organizationUserId = {
          [Op.in]: onlyForOrganizationUserIds
        };
      } else if (excludeForOrganizationUserIds.length > 0) {
        whereClauseDailyFee.organizationUserId = {
          [Op.notIn]: excludeForOrganizationUserIds
        };
      }
      const organizationUserDailyFeeReports = await this.organizationUserDailyFeeReportModel.findAll(
        {
          where: whereClauseDailyFee,
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
            type: 'daily_finance',
            organizationUserDailyFinanceReports
          }
        });
      }

      console.log(JSON.stringify(organizationUserDailyFeeReports));
      if (organizationUserDailyFeeReports.length > 0) {
        await this.rabbitMQProducerService.publishToQueue({
          queueName:
            RabbitMQQueueName.PAYMENT_ADJUSTMENT_REQUEST_CREATE_QUEUE_FIFO,
          data: {
            type: 'daily_fee',
            organizationUserDailyFeeReports
          }
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
