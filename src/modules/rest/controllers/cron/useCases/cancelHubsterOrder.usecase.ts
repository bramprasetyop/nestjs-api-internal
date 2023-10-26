import moment from 'moment';
import { IUseCase } from 'src/commons/useCase.interface';
import { Sequelize } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import { CancelHubsterOrderRequest } from '../dto/cancelHubsterOrderRequest.dto';
import {
  InjectionKey,
  RabbitMQProducerService,
  RabbitMQQueueName,
  UIDUtil,
  XHubsterOrderModel
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class CancelHubsterOrderUseCase implements IUseCase {
  private sequelize: Sequelize;
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    @Inject(InjectionKey.X_HUBSTER_ORDER_MODEL)
    private readonly xHubsterOrderModel: typeof XHubsterOrderModel
  ) {
    this.sequelize = this.xHubsterOrderModel.sequelize;
  }

  async execute(dto: CancelHubsterOrderRequest) {
    try {
      const { isReconcileFromFile, externalIds } = dto;
      if (isReconcileFromFile) {
        // Todo
      } else {
        if (externalIds && externalIds.length > 0) {
          for (let i = 0; i < externalIds.length; i++) {
            const externalId = externalIds[i];
            // send to queue for creating hubster order
            await this.rabbitMQProducerService.publishToQueue({
              queueName: RabbitMQQueueName.HUBSTER_EVENT_FIFO,
              data: {
                eventId: UIDUtil.generateUUIDv4(),
                eventTime: moment().toISOString(),
                eventType: 'orders.new_order',
                metadata: {
                  storeId: '-',
                  payload: {
                    externalIdentifiers: {
                      id: externalId
                    },
                    status: 'CANCELED'
                  }
                }
              }
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
