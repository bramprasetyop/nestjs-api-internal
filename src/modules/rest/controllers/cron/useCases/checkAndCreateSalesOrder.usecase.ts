import { IUseCase } from 'src/commons/useCase.interface';
import { Op, Sequelize } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import {
  InjectionKey,
  RabbitMQProducerService,
  RabbitMQTopicPubsubName,
  XHubsterOrderModel
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class CheckAndCreateSalesOrderUseCase implements IUseCase {
  private sequelize: Sequelize;
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    @Inject(InjectionKey.X_HUBSTER_ORDER_MODEL)
    private readonly xHubsterOrderModel: typeof XHubsterOrderModel
  ) {
    this.sequelize = this.xHubsterOrderModel.sequelize;
  }

  async execute() {
    try {
      const xHubsterOrders = await this.xHubsterOrderModel.findAll({
        where: {
          salesOrderId: {
            [Op.is]: null
          }
        }
      });

      for (let i = 0; i < xHubsterOrders.length; i++) {
        const xHubsterOrder = xHubsterOrders[i];
        // send to queue for creating sales order
        await this.rabbitMQProducerService.publishToPubsub({
          topicPubsubName:
            RabbitMQTopicPubsubName.X_HUBSTER_ORDER_CREATED_PUBSUB,
          data: {
            xHubsterOrder
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
