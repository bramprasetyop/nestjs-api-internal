import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { XWahyooPaymentAdjustmentRequestDetail } from './dto/xWahyooPaymentAdjustmentRequestDetail.dto';
import { XWahyooPaymentAdjustmentRequestDetailModel } from '@wahyoo/wahyoo-shared';
import { XWahyooPaymentAdjustmentRequestDetailMapper } from './mappers/xWahyooPaymentAdjustmentRequestDetail.mapper';
import { XWahyooPaymentAdjustmentRequestDetailRepository } from './repositories/xWahyooPaymentAdjustmentRequestDetail.repository';

@Injectable()
export class XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader
  implements NestDataLoader<string, XWahyooPaymentAdjustmentRequestDetail> {
  constructor(
    private readonly repository: XWahyooPaymentAdjustmentRequestDetailRepository
  ) {}
  generateDataLoader(): DataLoader<
    string,
    XWahyooPaymentAdjustmentRequestDetail
  > {
    return new DataLoader<string, XWahyooPaymentAdjustmentRequestDetail>(
      async keys => {
        const xWahyooPaymentAdjustmentRequestDetailModels: XWahyooPaymentAdjustmentRequestDetailModel[] = await this.repository.findByOrganizationUserDailyFeeReportIds(
          keys as string[]
        );
        const xWahyooPaymentAdjustmentRequestDetailList = XWahyooPaymentAdjustmentRequestDetailMapper.modelsToDTOs(
          xWahyooPaymentAdjustmentRequestDetailModels
        );
        return keys.map(key =>
          xWahyooPaymentAdjustmentRequestDetailList.find(
            xWahyooPaymentAdjustmentRequestDetail =>
              xWahyooPaymentAdjustmentRequestDetail.organizationUserDailyFeeReportId ===
              key
          )
        );
      }
    );
  }
}
