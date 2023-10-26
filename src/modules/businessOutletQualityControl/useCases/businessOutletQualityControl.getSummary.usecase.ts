import { Injectable } from '@nestjs/common';
import { BusinessOutletQualityControlStatus } from '@wahyoo/wahyoo-shared';
import { IUseCase } from 'src/commons/useCase.interface';
import { SalesOrderReportSummary } from 'src/modules/salesOrder/dto/salesOrderReportGetListResponse.dto';
import { BusinessOutletQualityControlGetSummaryResponse } from '../dto/businessOutletQualityControlGetSummaryResponse.dto';
import { BusinessOutletQualityControlRepository } from '../repositories/businessOutletQualityControl.repository';

@Injectable()
export class BusinessOutletQualityControlGetSummaryUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletQualityControlRepository
  ) {}

  async execute(
    businessId: string
  ): Promise<BusinessOutletQualityControlGetSummaryResponse> {
    const result = await this.repository.countStatusAggregate(businessId);
    const summary = {};
    Object.keys(BusinessOutletQualityControlStatus).forEach(key => {
      const model = result.find(
        model => model.status === BusinessOutletQualityControlStatus[key]
      );
      summary[key] = model ? model.getDataValue('totalStatus') : 0;
    });
    return {
      numberOfStatusNew: summary['new'],
      numberOfStatusExpired: summary['expired'],
      numberOfStatusReviewed: summary['reviewed'],
      numberOfStatusWaitingReview: summary['waiting_review']
    };
  }
}
