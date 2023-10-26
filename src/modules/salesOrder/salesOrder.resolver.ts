import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { SalesOrderSyncRequest } from './dto/salesOrderSyncRequest.dto';
import { SalesOrderSyncResponse } from './dto/salesOrderSyncResponse.dto';
import { SalesOrderSyncStatusRequest } from './dto/salesOrderSyncStatusRequest.dto';
import { SalesOrderSyncStatusResponse } from './dto/salesOrderSyncStatusResponse.dto';
import { SalesOrderGetSyncStatusUseCase } from './useCases/salesOrder.getSyncStatus.usecase';
import { SalesOrderSyncUseCase } from './useCases/salesOrder.sync.usecase';
import { Permissions } from '../auth/auth.permission.decorator';
import { SalesOrderGetListResponse } from './dto/salesOrderGetListResponse.dto';
import { SalesOrderGetListRequest } from './dto/salesOrderGetListRequest.dto';
import { SalesOrderGetListUseCase } from './useCases/salesOrder.getList.usecase';
import { SalesOrder } from './dto/salesOrder.dto';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { SalesOrderBusinessMenuItem } from './dto/salesOrderBusinessMenuItem.dto';
import { SalesOrderBusinessMenuItemBatchBySalesOrderIdLoader } from './salesOrderBusinessMenuItem.batchBySalesOrderId.loader';
import { BusinessSalesChannel } from '../businessSalesChannel/dto/businessSalesChannel.dto';
import { BusinessPaymentType } from '../businessPaymentType/dto/businessPaymentType.dto';
import { BusinessSalesChannelSingleByIdLoader } from '../businessSalesChannel/businessSalesChannel.singleById.loader';
import { BusinessPaymentTypeSingleByIdLoader } from '../businessPaymentType/businessPaymentType.singleById.loader';
import { SalesOrderGetByIdUseCase } from './useCases/salesOrder.getById.usecase';
import { SalesOrderUpdateUserInfoRequest } from './dto/salesOrderUpdateUserInfoRequest.dto';
import { SalesOrderUpdateUserInfoUseCase } from './useCases/salesOrder.updateUserInfo.usecase';
import { OrderDeliveryTimeWindowGetListUseCase } from './useCases/orderDeliveryTimeWindow.getList';
import { OrderDeliveryTimeWindowGetListResponse } from './dto/orderDeliveryTimeWindowGetListResponse.dto';
import { OrderDeliveryTimeWindowGetListRequest } from './dto/orderDeliveryTimeWindowGetListRequest.dto';
import { SalesOrderGetSummaryListResponse } from './dto/salesOrderGetSummaryListResponse.dto';
import { SalesOrderGetSummaryListRequest } from './dto/salesOrderGetSummaryListRequest.dto';
import { SalesOrderGetSummaryListUseCase } from './useCases/salesOrder.getSummaryList.usecase';

@Resolver(SalesOrder)
export class SalesOrderResolver {
  constructor(
    private readonly salesOrderGetByIdUseCase: SalesOrderGetByIdUseCase,
    private readonly salesOrderGetListUseCase: SalesOrderGetListUseCase,
    private readonly salesOrderGetSummaryListUseCase: SalesOrderGetSummaryListUseCase,
    private readonly salesOrderGetSyncStatusUseCase: SalesOrderGetSyncStatusUseCase,
    private readonly salesOrderSyncUseCase: SalesOrderSyncUseCase,
    private readonly salesOrderUpdateUserInfoUseCase: SalesOrderUpdateUserInfoUseCase,
    private readonly orderDeliveryTimeWindowGetListUseCase: OrderDeliveryTimeWindowGetListUseCase
  ) {}

  @Query(() => SalesOrder)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('sales_order:read')
  async salesOrderById(@Args('id') id: string): Promise<SalesOrder> {
    return this.salesOrderGetByIdUseCase.execute(id);
  }

  @Query(() => OrderDeliveryTimeWindowGetListResponse)
  @UseGuards(GqlAuthGuard)
  async orderDeliveryTimeWindowGetList(
    @Args() requestDTO: OrderDeliveryTimeWindowGetListRequest
  ): Promise<OrderDeliveryTimeWindowGetListResponse> {
    return this.orderDeliveryTimeWindowGetListUseCase.execute(requestDTO);
  }

  @Query(() => SalesOrderGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('sales_order:read')
  async salesOrderList(
    @Args() requestDTO: SalesOrderGetListRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<SalesOrderGetListResponse> {
    return this.salesOrderGetListUseCase.with(currentUser).execute(requestDTO);
  }

  // @Query(() => SalesOrderSyncStatusResponse)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('sales_order:read')
  // async salesOrderSyncStatus(
  //   @Args('input') requestDTO: SalesOrderSyncStatusRequest,
  //   @CurrentUser() currentUser: ICurrentUserArgs
  // ): Promise<SalesOrderSyncStatusResponse> {
  //   return this.salesOrderGetSyncStatusUseCase
  //     .with(currentUser)
  //     .execute(requestDTO);
  // }

  // @Query(() => SalesOrderGetSummaryListResponse)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('sales_order:read')
  // async salesOrderGetSummaryList(
  //   @Args() requestDTO: SalesOrderGetSummaryListRequest,
  //   @CurrentUser() currentUser: ICurrentUserArgs
  // ): Promise<SalesOrderGetSummaryListResponse> {
  //   return this.salesOrderGetSummaryListUseCase.execute(requestDTO);
  // }

  // @Mutation(() => SalesOrderSyncResponse)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('sales_order:create')
  // async salesOrderSync(
  //   @Args('input') requestDTO: SalesOrderSyncRequest,
  //   @CurrentUser() currentUser: ICurrentUserArgs
  // ): Promise<SalesOrderSyncResponse> {
  //   return this.salesOrderSyncUseCase.with(currentUser).execute(requestDTO);
  // }

  // @Mutation(() => SalesOrder)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // // @Permissions('sales_order:user_name_phone_number_update')
  // @Permissions('sales_order:update')
  // async salesOrderUpdateUserInfo(
  //   @Args('input') requestDTO: SalesOrderUpdateUserInfoRequest
  // ): Promise<SalesOrder> {
  //   return this.salesOrderUpdateUserInfoUseCase.execute(requestDTO);
  // }

  // RESOLVER FIELD
  @ResolveField(() => [BusinessSalesChannel])
  async businessSalesChannel(
    @Parent() salesOrder: SalesOrder,
    @Loader(BusinessSalesChannelSingleByIdLoader.name)
    businessSalesChannelSingleByIdLoader: DataLoader<
      string,
      BusinessSalesChannel
    >
  ): Promise<BusinessSalesChannel> {
    try {
      const response = await businessSalesChannelSingleByIdLoader.load(
        salesOrder.businessSalesChannelId
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => [BusinessPaymentType])
  async businessPaymentType(
    @Parent() salesOrder: SalesOrder,
    @Loader(BusinessPaymentTypeSingleByIdLoader.name)
    businessPaymentTypeSingleByIdLoader: DataLoader<string, BusinessPaymentType>
  ): Promise<BusinessPaymentType> {
    try {
      if (salesOrder.businessPaymentTypeId) {
        const response = await businessPaymentTypeSingleByIdLoader.load(
          salesOrder.businessPaymentTypeId
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => [SalesOrderBusinessMenuItem])
  async salesOrderBusinessMenuItems(
    @Parent() salesOrder: SalesOrder,
    @Loader(SalesOrderBusinessMenuItemBatchBySalesOrderIdLoader.name)
    salesOrderBusinessMenuItemBatchBySalesOrderIdLoader: DataLoader<
      string,
      SalesOrderBusinessMenuItem[]
    >
  ): Promise<SalesOrderBusinessMenuItem[]> {
    try {
      const response = await salesOrderBusinessMenuItemBatchBySalesOrderIdLoader.load(
        salesOrder.id
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
}
