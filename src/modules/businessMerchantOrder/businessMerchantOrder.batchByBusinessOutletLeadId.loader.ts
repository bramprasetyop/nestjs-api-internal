import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMerchantOrderModel } from '@wahyoo/wahyoo-shared';
import { BusinessMerchantOrder } from './dto/businessMerchantOrder.dto';
import { BusinessMerchantOrderMapper } from './mappers/businessMerchantOrder.mapper';
import { BusinessMerchantOrderRepository } from './repositories/businessMerchantOrder.repository';

@Injectable()
export class BusinessMerchantOrderBatchByBusinessOutletLeadIdLoader
  implements NestDataLoader<string, BusinessMerchantOrder[]> {
  constructor(private readonly repository: BusinessMerchantOrderRepository) {}
  generateDataLoader(): DataLoader<string, BusinessMerchantOrder[]> {
    return new DataLoader<string, BusinessMerchantOrder[]>(async keys => {
      const businessMerchantOrders: BusinessMerchantOrderModel[] = await this.repository.findByBusinessOutletLeadIds(
        keys as string[]
      );
      const businessMerchantOrderList = BusinessMerchantOrderMapper.modelsToDTOs(
        businessMerchantOrders
      );
      return keys.map(key =>
        businessMerchantOrderList.filter(
          businessMerchantOrder =>
            businessMerchantOrder.businessOutletLeadId === key
        )
      );
    });
  }
}
