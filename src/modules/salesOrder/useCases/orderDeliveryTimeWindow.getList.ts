import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';
import { OrderDeliveryTimeWindowGetListRequest } from '../dto/orderDeliveryTimeWindowGetListRequest.dto';
import { OrderDeliveryTimeWindowGetListResponse } from '../dto/orderDeliveryTimeWindowGetListResponse.dto';

@Injectable()
export class OrderDeliveryTimeWindowGetListUseCase implements IUseCase {
  constructor(private internalAPIService: InternalAPIService) {}
  async execute(
    dto: OrderDeliveryTimeWindowGetListRequest
  ): Promise<OrderDeliveryTimeWindowGetListResponse> {
    const res = await this.internalAPIService.getOrderDeliveryTimeWindowList(
      dto
    );
    return {
      ...res,
      orderDeliveryTimeWindows: res.orderDeliveryTimeWindows.map(
        orderDeliveryTimeWindow => ({
          ...orderDeliveryTimeWindow,
          createdAt: new Date(orderDeliveryTimeWindow.createdAt),
          updatedAt: new Date(orderDeliveryTimeWindow.updatedAt)
        })
      )
    };
  }
}
