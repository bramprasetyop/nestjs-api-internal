import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { SalesOrderGetSummaryListRequest } from '../dto/salesOrderGetSummaryListRequest.dto';
import { SalesOrderGetSummaryListResponse } from '../dto/salesOrderGetSummaryListResponse.dto';
import { SalesOrderRepository } from '../repositories/salesOrder.repository';

@Injectable()
export class SalesOrderGetSummaryListUseCase implements IUseCase {
  constructor(private readonly repository: SalesOrderRepository) {}

  async execute(
    dto: SalesOrderGetSummaryListRequest
  ): Promise<SalesOrderGetSummaryListResponse> {
    const summaries = await this.repository.getDailySummaryList(dto);
    const groupedSummaries = summaries.reduce((r, a) => {
      const idx = r.findIndex(element => a.day === element.day);
      if (idx === -1) {
        const isOnlineOrder =
          a.dailyTransactionSummaryDetail.businessSalesChannelCategoryName ===
          'Aplikasi Online';
        r.push({
          day: a.day,
          totalOfflineSales: isOnlineOrder
            ? 0
            : Number(a.dailyTransactionSummaryDetail.totalSales),
          totalOnlineSales: isOnlineOrder
            ? Number(a.dailyTransactionSummaryDetail.totalSales)
            : 0,
          totalEstimatedEarnings: isOnlineOrder
            ? Number(a.dailyTransactionSummaryDetail.estimatedEarnings)
            : 0,
          dailyTransactionSummaryDetails: [a.dailyTransactionSummaryDetail]
        });
        return r;
      }

      r[idx].dailyTransactionSummaryDetails.push(
        a.dailyTransactionSummaryDetail
      );
      if (
        a.dailyTransactionSummaryDetail.businessSalesChannelCategoryName ===
        'Aplikasi Online'
      ) {
        r[idx].totalOnlineSales += Number(
          a.dailyTransactionSummaryDetail.totalSales
        );
        r[idx].totalEstimatedEarnings += Number(
          a.dailyTransactionSummaryDetail.estimatedEarnings
        );
      } else {
        r[idx].totalOfflineSales += Number(
          a.dailyTransactionSummaryDetail.totalSales
        );
      }
      return r;
    }, []);
    console.log(groupedSummaries);
    return { dailyTransactionSummaries: groupedSummaries };
  }
}
