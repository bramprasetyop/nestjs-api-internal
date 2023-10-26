import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { SalesOrderReportGetReportListUseCase } from './useCases/salesOrderReport.getReportList.usecase';
import { SalesOrderReportGetReportListByMenuItemUseCase } from './useCases/salesOrderReport.getReportListByMenuItem.usecase';
import { SalesOrderReportGetReportListByChannelUseCase } from './useCases/salesOrderReport.getReportListBySalesChannel.usecase';
import { Permissions } from '../auth/auth.permission.decorator';
import { SalesOrderReportGetListRequest } from './dto/salesOrderReportGetListRequest.dto';
import { SalesOrderReportGetListResponse } from './dto/salesOrderReportGetListResponse.dto';
import { SalesOrderReportListByChannelResponse } from './dto/salesOrderReportListByChannelResponse.dto';
import { SalesOrderReportByChannelRequest } from './dto/salesOrderReportListByChannelRequest.dto';
import { SalesOrderReportByMenuItemRequest } from './dto/salesOrderReportListByMenuItemRequest.dto';
import { SalesOrderReportByMenuItemResponse } from './dto/salesOrderReportListByMenuItemResponse.dto';

@Resolver()
export class SalesOrderReportResolver {
  constructor(
    private readonly salesOrderReportGetReportListUseCase: SalesOrderReportGetReportListUseCase,
    private readonly salesOrderReportGetReportListByMenuItemUseCase: SalesOrderReportGetReportListByMenuItemUseCase,
    private readonly salesOrderReportGetReportListByChannelUseCase: SalesOrderReportGetReportListByChannelUseCase
  ) {}

  @Query(() => SalesOrderReportGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('sales_order_report:read')
  async salesOrderReportList(
    @Args() requestDTO: SalesOrderReportGetListRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<SalesOrderReportGetListResponse> {
    return this.salesOrderReportGetReportListUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @Query(() => SalesOrderReportListByChannelResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('sales_order_report:read')
  async salesOrderChannelReportList(
    @Args() requestDTO: SalesOrderReportByChannelRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<SalesOrderReportListByChannelResponse> {
    return this.salesOrderReportGetReportListByChannelUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @Query(() => SalesOrderReportByMenuItemResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('sales_order_report:read')
  async salesOrderMenuItemReportList(
    @Args() requestDTO: SalesOrderReportByMenuItemRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<SalesOrderReportByMenuItemResponse> {
    return this.salesOrderReportGetReportListByMenuItemUseCase
      .with(currentUser)
      .execute(requestDTO);
  }
}
