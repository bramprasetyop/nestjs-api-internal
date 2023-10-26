import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessMerchantOrderPaymentModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMerchantOrderPayment } from './dto/businessMerchantOrderPayment.dto';
import { BusinessMerchantOrderPaymentRepository } from './repositories/businessMerchantOrderPayment.repository';
import { BusinessMerchantOrderPaymentMapper } from './mappers/businessMerchantOrderPayment.mapper';

@Injectable()
export class BusinessMerchantOrderPaymentSingleByBusinessMerchantOrderIdLoader
  implements NestDataLoader<string, BusinessMerchantOrderPayment> {
  constructor(
    private readonly repository: BusinessMerchantOrderPaymentRepository
  ) {}
  generateDataLoader(): DataLoader<string, BusinessMerchantOrderPayment> {
    return new DataLoader<string, BusinessMerchantOrderPayment>(async keys => {
      const businessMerchantOrderPayments: BusinessMerchantOrderPaymentModel[] = await this.repository.findByBusinessMerchantOrderIds(
        keys as string[]
      );
      const businessMerchantOrderPaymentList = BusinessMerchantOrderPaymentMapper.modelsToDTOs(
        businessMerchantOrderPayments
      );
      return keys.map(key =>
        businessMerchantOrderPaymentList.find(
          businessMerchantOrderPayment =>
            businessMerchantOrderPayment.businessMerchantOrderId === key
        )
      );
    });
  }
}
