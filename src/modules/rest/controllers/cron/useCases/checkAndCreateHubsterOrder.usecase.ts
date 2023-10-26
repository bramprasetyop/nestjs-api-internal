import moment from 'moment';
import { IUseCase } from 'src/commons/useCase.interface';
import { Sequelize, QueryTypes } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import {
  InjectionKey,
  RabbitMQProducerService,
  RabbitMQQueueName,
  XHubsterEventModel
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class CheckAndCreateHubsterOrderUseCase implements IUseCase {
  private sequelize: Sequelize;
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    @Inject(InjectionKey.X_HUBSTER_EVENT_MODEL)
    private readonly xHubsterEventModel: typeof XHubsterEventModel
  ) {
    this.sequelize = this.xHubsterEventModel.sequelize;
  }

  async execute() {
    try {
      const sql = `SELECT xhe.raw_json ->'metadata'->'payload'->'externalIdentifiers'->>'id' AS external_id,
      xho.id AS x_hubster_order_id, xhe.raw_json AS "rawJson"
      FROM x_hubster_events xhe 
      LEFT JOIN x_hubster_orders xho on xho.id = xhe.raw_json ->'metadata'->'payload'->'externalIdentifiers'->>'id'
      WHERE xhe.x_hubster_order_id IS NULL AND
      DATE(xhe.created_at) >= CURRENT_DATE - interval '5 day'
      AND xho.id IS NULL`;

      const xHubsterEvents: any[] = await this.xHubsterEventModel.sequelize.query(
        sql,
        {
          type: QueryTypes.SELECT
        }
      );

      for (let i = 0; i < xHubsterEvents.length; i++) {
        const xHubsterEvent = xHubsterEvents[i];
        // send to queue for creating hubster order
        await this.rabbitMQProducerService.publishToQueue({
          queueName: RabbitMQQueueName.HUBSTER_EVENT_FIFO,
          data: xHubsterEvent.rawJson
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
