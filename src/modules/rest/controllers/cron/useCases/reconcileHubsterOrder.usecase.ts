import _ from 'lodash';
import moment from 'moment';
import { Op } from 'sequelize';
import { TimeZone } from 'src/commons/constants/timeZone';
import { IUseCase } from 'src/commons/useCase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ReconcileHubsterOrderRequest } from '../dto/reconcileHubsterOrder.dto';
import {
  HubsterPosService,
  InjectionKey,
  config,
  RabbitMQProducerService,
  RabbitMQQueueName,
  XHubsterOrderModel,
  XHubsterStoreModel,
  BusinessOutletModel,
  BusinessOutletStatus,
  UIDUtil
} from '@wahyoo/wahyoo-shared';

export enum HubsterOrderStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED'
}

@Injectable()
export class ReconcileHubsterOrderUseCase implements IUseCase {
  constructor(
    private readonly rabbitMQProducerService: RabbitMQProducerService,
    private readonly hubsterPosService: HubsterPosService,
    @Inject(InjectionKey.BUSINESS_OUTLET_MODEL)
    private readonly businessOutletModel: typeof BusinessOutletModel,
    @Inject(InjectionKey.X_HUBSTER_STORE_MODEL)
    private readonly xHubsterStoreModel: typeof XHubsterStoreModel,
    @Inject(InjectionKey.X_HUBSTER_ORDER_MODEL)
    private readonly xHubsterOrderModel: typeof XHubsterOrderModel
  ) {}

  async checkAndReconcileHubsterOrderByStoreId({
    dto,
    token,
    storeId
  }: {
    dto: ReconcileHubsterOrderRequest;
    storeId: string;
    token: string;
  }) {
    try {
      let limit = 1000;
      let startTimeTodayMoment = moment
        .tz(TimeZone.ASIA_JAKARTA)
        .startOf('day');
      let endTimeTodayMoment = moment.tz(TimeZone.ASIA_JAKARTA).endOf('day');

      if (dto.startDate && dto.endDate) {
        startTimeTodayMoment = moment(dto.startDate, 'YYYY-MM-DD').startOf(
          'day'
        );
        endTimeTodayMoment = moment(dto.endDate, 'YYYY-MM-DD').endOf('day');
      }

      if (dto.start) {
        if (dto.start.indexOf('days') > -1) {
          const arrStr = dto.start.split('-');
          console.log('subtract days:', Number(arrStr[1]));
          startTimeTodayMoment = moment
            .tz(TimeZone.ASIA_JAKARTA)
            .subtract(Number(arrStr[1]), 'days')
            .startOf('day');
        }
      }

      if (dto.limit) {
        limit = dto.limit;
      }

      console.log('startTimeTodayMoment', startTimeTodayMoment.toISOString());
      console.log('endTimeTodayMoment', endTimeTodayMoment.toISOString());

      const { responseBody } = await this.hubsterPosService.getOrders({
        token,
        storeId,
        limit,
        minDateTime: startTimeTodayMoment.toDate(),
        maxDateTime: endTimeTodayMoment.toDate()
      });
      let hubsterOrders: any[] = _.get(responseBody, 'orders', []);
      console.log('hubsterOrders.length from API', hubsterOrders.length);

      // use dummy for testing only
      if (dto.isDummy && dto.dummyEvents.length > 0) {
        hubsterOrders = dto.dummyEvents;
      }

      for (let i = 0; i < hubsterOrders.length; i++) {
        const hubsterOrder = hubsterOrders[i];
        const id = _.get(hubsterOrder, 'externalIdentifiers.id', null);
        // const status = _.get(hubsterOrder, 'status', '');
        const orderedAt = _.get(hubsterOrder, 'orderedAt', null);
        if (id) {
          const { items } = hubsterOrder;
          // fill  null value for skuPrice
          items.forEach(item => {
            if (item.skuPrice === null) {
              item.skuPrice = item.price;
            }
            const { modifiers } = item;
            if (modifiers) {
              modifiers.forEach(modifier => {
                if (modifier.skuPrice === null) {
                  modifier.skuPrice = modifier.price;
                }
              });
            }
          });
          const payloadEvent = {
            eventId: UIDUtil.generateUUIDv4(),
            eventTime: orderedAt,
            eventType: 'orders.new_order',
            metadata: {
              storeId: storeId,
              applicationId: config.hubsterPosConfig.clientId,
              resourceId: 'manual reconcile',
              payload: hubsterOrder
            }
          };
          console.log(JSON.stringify(payloadEvent));
          await this.rabbitMQProducerService.publishToQueue({
            queueName: RabbitMQQueueName.HUBSTER_EVENT_FIFO,
            data: payloadEvent
          });
        }
      }
    } catch (err) {
      console.log('checkAndReconcileHubsterOrderByStoreId failed, error:', err);
    }
  }

  async execute(dto: ReconcileHubsterOrderRequest) {
    try {
      const closedBusinessOutlets = await this.businessOutletModel.findAll({
        where: {
          status: BusinessOutletStatus.closed
        }
      });
      const closedBusinessOutletIds = closedBusinessOutlets.map(
        closedbusinessOutlet => closedbusinessOutlet.id
      );
      const xHubsterStores = await this.xHubsterStoreModel.findAll({
        where: {
          businessOutletId: { [Op.notIn]: closedBusinessOutletIds }
        }
      });

      // generate token once, if repeat will be rejected
      const token = await this.hubsterPosService.generateToken();
      for (let i = 0; i < xHubsterStores.length; i++) {
        const xHubsterStore = xHubsterStores[i];
        await this.checkAndReconcileHubsterOrderByStoreId({
          dto,
          token,
          storeId: xHubsterStore.id
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
