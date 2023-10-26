import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { XXenditPaymentModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMerchantOrderPayment } from './dto/businessMerchantOrderPayment.dto';
import { BusinessMerchantOrderPaymentRepository } from './repositories/businessMerchantOrderPayment.repository';
import { BusinessMerchantOrderPaymentMapper } from './mappers/businessMerchantOrderPayment.mapper';
import { XXenditPayment } from './dto/XXenditPayment.dto';
import { XXenditPaymentRepository } from './repositories/xXenditPayment.repository';
import { XXenditPaymentMapper } from './mappers/XXenditPayment.mapper';

@Injectable()
export class XXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader
  implements NestDataLoader<string, XXenditPayment> {
  constructor(private readonly repository: XXenditPaymentRepository) {}
  generateDataLoader(): DataLoader<string, XXenditPayment> {
    return new DataLoader<string, XXenditPayment>(async keys => {
      const xXenditPayments: XXenditPaymentModel[] = await this.repository.findByBusinessMerchantOrderPaymentIds(
        keys as string[]
      );
      const xXenditPaymentList = XXenditPaymentMapper.modelsToDTOs(
        xXenditPayments
      );
      return keys.map(key =>
        xXenditPaymentList.find(
          xXenditPayment =>
            xXenditPayment.businessMerchantOrderPaymentId === key
        )
      );
    });
  }
}
