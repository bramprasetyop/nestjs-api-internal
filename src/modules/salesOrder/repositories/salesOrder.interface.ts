import { SalesOrderModel } from '@wahyoo/wahyoo-shared';
import { SalesOrderGetListRequest } from '../dto/salesOrderGetListRequest.dto';
import { SalesOrderGetSummaryListRequest } from '../dto/salesOrderGetSummaryListRequest.dto';
import { SalesOrderSyncInput } from '../dto/salesOrderSyncRequest.dto';

export class PagingSalesOrderModel {
  salesOrders: SalesOrderModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface ISalesOrderRepository {
  findAll(dto: SalesOrderGetListRequest): Promise<PagingSalesOrderModel>;
  findById(id: string): Promise<SalesOrderModel>;
  findByRefId(refId: string): Promise<SalesOrderModel>;
  create(salesOrderSyncInput: SalesOrderSyncInput): Promise<SalesOrderModel>;
  updateStatusByRefId(
    salesOrderSyncInput: SalesOrderSyncInput
  ): Promise<SalesOrderModel>;
  getDailySummaryList(dto: SalesOrderGetSummaryListRequest): Promise<any>;
}
