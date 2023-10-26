import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessMerchantOrderItemModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMerchantOrderItem } from './dto/businessMerchantOrderItem.dto';
import { BusinessMerchantOrderItemRepository } from './repositories/businessMerchantOrderItem.repository';
import { BusinessMerchantOrderItemMapper } from './mappers/businessMerchantOrderItem.mapper';

@Injectable()
export class BusinessMerchantOrderItemBatchByBusinessMerchantOrderIdLoader
  implements NestDataLoader<string, BusinessMerchantOrderItem[]> {
  constructor(
    private readonly repository: BusinessMerchantOrderItemRepository
  ) {}
  generateDataLoader(): DataLoader<string, BusinessMerchantOrderItem[]> {
    return new DataLoader<string, BusinessMerchantOrderItem[]>(async keys => {
      const businessMerchantOrderItems: BusinessMerchantOrderItemModel[] = await this.repository.findByBusinessMerchantOrderIds(
        keys as string[]
      );
      const businessMerchantOrderItemList = BusinessMerchantOrderItemMapper.modelsToDTOs(
        businessMerchantOrderItems
      );
      return keys.map(key =>
        businessMerchantOrderItemList.filter(
          businessMerchantOrderItem =>
            businessMerchantOrderItem.businessMerchantOrderId === key
        )
      );
    });
  }
}
