import moment from 'moment';
import { Op } from 'sequelize';
import { IUseCase } from 'src/commons/useCase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DailyFinanceReportUnprocessedRequest } from '../dto/dailyFinanceReportRequest.dto';
import {
  BusinessOutletPropertyModel,
  InjectionKey,
  RabbitMQProducerService,
  RabbitMQQueueName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class DailyFinanceReportUnprocessedUseCase implements IUseCase {
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    @Inject(InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL)
    private readonly businessOutletPropertyModel: typeof BusinessOutletPropertyModel
  ) {}

  async execute(dto: DailyFinanceReportUnprocessedRequest) {
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
          throw Error(`startDate is not valid, must have format 'YYYY-MM-DD'`);
        }
        startDate = dto.startDate;
      }

      if (dto.endDate) {
        const isValidDate = moment(endDate, 'YYYY-MM-DD', true).isValid();
        if (!isValidDate) {
          throw Error(`endDate is not valid, must have format 'YYYY-MM-DD'`);
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

      let whereClause: any = {
        dailyTransferOrganizationUserId: {
          [Op.ne]: null
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
        whereClause = {
          dailyTransferOrganizationUserId: {
            [Op.in]: onlyForOrganizationUserIds
          }
        };
      } else if (excludeForOrganizationUserIds.length > 0) {
        whereClause = {
          dailyTransferOrganizationUserId: {
            [Op.notIn]: excludeForOrganizationUserIds
          }
        };
      }

      const businessOutletProperties = await this.businessOutletPropertyModel.findAll(
        {
          where: whereClause,
          attributes: ['dailyTransferOrganizationUserId'],
          group: ['dailyTransferOrganizationUserId']
        }
      );

      const organizationUserIds = businessOutletProperties.map(
        businessOutletProperty =>
          businessOutletProperty.dailyTransferOrganizationUserId
      );

      for (
        let currentDate = startDate;
        moment(currentDate).isSameOrBefore(endDate);
        currentDate = moment(currentDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
      ) {
        for (let i = 0; i < organizationUserIds.length; i++) {
          const organizationUserId = organizationUserIds[i];
          await this.rabbitMQProducerService.publishToQueue({
            queueName:
              RabbitMQQueueName.ORGANIZATION_USER_DAILY_FINANCE_REPORT_CREATE_QUEUE_FIFO,
            data: {
              isUnprocessed: true,
              currentDate,
              organizationUserId
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
