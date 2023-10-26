import { SalesOrderReportByChannelRequest } from '../dto/salesOrderReportListByChannelRequest.dto';
import { SalesOrderReportListByChannelResponse } from '../dto/salesOrderReportListByChannelResponse.dto';
import { SalesOrderReportByMenuItemRequest } from '../dto/salesOrderReportListByMenuItemRequest.dto';
import { SalesOrderReportByMenuItemResponse } from '../dto/salesOrderReportListByMenuItemResponse.dto';
import { SalesOrderReportGetListRequest } from '../dto/salesOrderReportGetListRequest.dto';
import { SalesOrderReportGetListResponse } from '../dto/salesOrderReportGetListResponse.dto';
import { SalesOrderSyncInput } from '../dto/salesOrderSyncRequest.dto';

export interface ISalesOrderReportRepository {
  getReportList(
    dto: SalesOrderReportGetListRequest
  ): Promise<SalesOrderReportGetListResponse>;
  getReportListBySalesChannel(
    dto: SalesOrderReportByChannelRequest
  ): Promise<SalesOrderReportListByChannelResponse>;
  getReportListByMenuItem(
    dto: SalesOrderReportByMenuItemRequest
  ): Promise<SalesOrderReportByMenuItemResponse>;
}
