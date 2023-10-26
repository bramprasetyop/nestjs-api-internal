import moment from 'moment';
import { Op } from 'sequelize';
import { IUseCase } from 'src/commons/useCase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DailyFinanceReportRequest } from '../dto/dailyFinanceReportRequest.dto';
import {
  BusinessOutletPropertyModel,
  InjectionKey,
  RabbitMQProducerService,
  RabbitMQQueueName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class DailyFinanceReportUseCase implements IUseCase {
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    @Inject(InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL)
    private readonly businessOutletPropertyModel: typeof BusinessOutletPropertyModel
  ) {}

  async execute(dto: DailyFinanceReportRequest) {
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

      // will request daily transfer for yesterday or H-1
      if (!currentDate) {
        currentDate = moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD');
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
      let organizationUserIds = businessOutletProperties.map(
        businessOutletProperty =>
          businessOutletProperty.dailyTransferOrganizationUserId
      );

      for (let i = 0; i < organizationUserIds.length; i++) {
        const organizationUserId = organizationUserIds[i];
        await this.rabbitMQProducerService.publishToQueue({
          queueName:
            RabbitMQQueueName.ORGANIZATION_USER_DAILY_FINANCE_REPORT_CREATE_QUEUE_FIFO,
          data: {
            isUnprocessed: false,
            currentDate,
            organizationUserId
          }
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
