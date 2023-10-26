import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessMerchantOrder } from './dto/businessMerchantOrder.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMerchantOrderRepository } from './repositories/businessMerchantOrder.repository';
import { BusinessMerchantOrderModel } from '@wahyoo/wahyoo-shared';
import { BusinessMerchantOrderMapper } from './mappers/businessMerchantOrder.mapper';

@Injectable()
export class BusinessMerchantOrderSingleByIdLoader
  implements NestDataLoader<string, BusinessMerchantOrder> {
  constructor(private readonly repository: BusinessMerchantOrderRepository) {}
  generateDataLoader(): DataLoader<string, BusinessMerchantOrder> {
    return new DataLoader<string, BusinessMerchantOrder>(async keys => {
      const businessMerchantOrders: BusinessMerchantOrderModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const businessList = BusinessMerchantOrderMapper.modelsToDTOs(
        businessMerchantOrders
      );
      return keys.map(key =>
        businessList.find(business => business.id === key)
      );
    });
  }
}
