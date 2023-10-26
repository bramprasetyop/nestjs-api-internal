import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  ScheduledNotificationModel,
  ScheduledNotificationLogModel,
  ScheduledNotificationStatus
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import {
  IScheduledNotificationRepository,
  PagingScheduledNotificationModel
} from './scheduledNotification.interface';
import { ScheduledNotificationListRequest } from '../dto/scheduledNotificationListRequest.dto';
import { SendNotificationRequest } from '../dto/sendNotificationRequest.dto';
import { ScheduledNotificationUpdateRequest } from '../dto/scheduledNotificationUpdateRequest.dto';

@Injectable()
export class ScheduledNotificationRepository
  implements IScheduledNotificationRepository {
  constructor(
    @Inject(InjectionKey.SCHEDULED_NOTIFICATION_MODEL)
    private readonly scheduledNotificationModel: typeof ScheduledNotificationModel,
    @Inject(InjectionKey.SCHEDULED_NOTIFICATION_LOG_MODEL)
    private readonly scheduledNotificationLogModel: typeof ScheduledNotificationLogModel
  ) {}

  public async findAll(
    dto: ScheduledNotificationListRequest
  ): Promise<PagingScheduledNotificationModel> {
    const { sortBy, page, pageSize, filter, search } = dto;
    const whereClause: any = {};
    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }
    }

    if (search) {
      whereClause.status = { [Op.iLike]: '%' + search + '%' };
    }

    const result = await this.scheduledNotificationModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });

    return {
      scheduledNotifications: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(id: string): Promise<ScheduledNotificationModel> {
    return await this.scheduledNotificationModel.findOne({
      where: {
        id
      }
    });
  }

  public async update(
    dto: ScheduledNotificationUpdateRequest
  ): Promise<ScheduledNotificationModel> {
    const { id, notificationPayloadJson, scheduleDatetime } = dto;
    const existingScheduleNotification = await this.findById(id);
    let transaction;
    try {
      transaction = await this.scheduledNotificationModel.sequelize.transaction();
      const updateScheduleNotification = await existingScheduleNotification.update(
        dto,
        {
          transaction
        }
      );

      delete dto.id;

      await this.scheduledNotificationLogModel.create(
        {
          ...dto,
          status: existingScheduleNotification.status,
          scheduledNotificationId: id
        },
        { transaction }
      );
      await transaction.commit();
      return updateScheduleNotification;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async cancel(id: string): Promise<ScheduledNotificationModel> {
    let transaction;
    const scheduledNotification = await this.scheduledNotificationModel.findOne(
      {
        where: {
          id
        }
      }
    );

    try {
      transaction = await this.scheduledNotificationModel.sequelize.transaction();
      const updateScheduledNotification = await scheduledNotification.update(
        {
          status: ScheduledNotificationStatus.cancelled
        },
        { transaction }
      );

      delete scheduledNotification.id;
      await this.scheduledNotificationLogModel.create(
        {
          ...scheduledNotification,
          notificationPayloadJson: JSON.stringify(
            scheduledNotification.notificationPayloadJson
          ),
          status: ScheduledNotificationStatus.cancelled,
          scheduledNotificationId: id
        },
        { transaction }
      );

      await transaction.commit();
      return updateScheduledNotification;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  public async destroyById(id: string): Promise<Boolean> {
    const res = await this.scheduledNotificationModel.destroy({
      where: { id }
    });
    return res > 0 ? true : false;
  }

  public async create(
    dto: SendNotificationRequest
  ): Promise<ScheduledNotificationModel> {
    return await this.scheduledNotificationModel.create<
      ScheduledNotificationModel
    >({
      notificationPayloadJson: dto,
      scheduleDatetime: dto.scheduleDatetime,
      status: ScheduledNotificationStatus.scheduled,
      createdBy: dto.createdBy
    });
  }
}
