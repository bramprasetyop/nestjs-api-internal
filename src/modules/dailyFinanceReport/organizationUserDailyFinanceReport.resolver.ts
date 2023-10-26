import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { MyOrganizationUserDailyFinanceReportGetListRequest } from './dto/myOrganizationUserDailyFinanceReportGetListRequest.dto';
import { OrganizationUserDailyFeeReport } from './dto/organizationUserDailyFeeReport.dto';
import { OrganizationUserDailyFinanceReport } from './dto/organizationUserDailyFinanceReport.dto';
import { OrganizationUserDailyFinanceReportGetListRequest } from './dto/organizationUserDailyFinanceReportGetListRequest.dto';
import { OrganizationUserDailyFinanceReportGetListResponse } from './dto/organizationUserDailyFinanceReportGetListResponse.dto';
import { XWahyooPaymentAdjustmentRequestDetail } from './dto/xWahyooPaymentAdjustmentRequestDetail.dto';
import { OrganizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader } from './organizationUserDailyFeeReport.singleByOrganizationUserDailyFinanceReport.loader';
import { MyOrganizationUserDailyFinanceReportGetListUseCase } from './useCases/myOrganizationUserDailyFinanceReport.getList.usecase';
import { OrganizationUserDailyFinanceReportGetByIdUseCase } from './useCases/organizationUserDailyFinanceReport.getById.usecase';
import { OrganizationUserDailyFinanceReportGetListUseCase } from './useCases/organizationUserDailyFinanceReport.getList.usecase';
import { XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader } from './xWahyooPaymentAdjustmentRequestDetail.singleByOrganizationUserDailyFinanceReportId.loader';

@Resolver(OrganizationUserDailyFinanceReport)
export class OrganizationUserDailyFinanceReportResolver {
  constructor(
    private readonly organizationUserDailyFinanceReportGetByIdUseCase: OrganizationUserDailyFinanceReportGetByIdUseCase,
    private readonly organizationUserDailyFinanceReportGetListUseCase: OrganizationUserDailyFinanceReportGetListUseCase,
    private readonly myOrganizationUserDailyFinanceReportGetListUseCase: MyOrganizationUserDailyFinanceReportGetListUseCase
  ) {}

  @Query(() => OrganizationUserDailyFinanceReport)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('organization_user_daily_finance_report:read')
  async organizationUserDailyFinanceReportById(
    @Args('id') id: string,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<OrganizationUserDailyFinanceReport> {
    return this.organizationUserDailyFinanceReportGetByIdUseCase
      .with(currentUser)
      .execute(id);
  }

  @Query(() => OrganizationUserDailyFinanceReportGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('organization_user_daily_finance_report:read')
  async organizationUserDailyFinanceReportList(
    @Args() requestDTO: OrganizationUserDailyFinanceReportGetListRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<OrganizationUserDailyFinanceReportGetListResponse> {
    return this.organizationUserDailyFinanceReportGetListUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @Query(() => OrganizationUserDailyFinanceReportGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('my_organization_user_daily_finance_report:read')
  async myOrganizationUserDailyFinanceReportList(
    @Args() requestDTO: MyOrganizationUserDailyFinanceReportGetListRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<OrganizationUserDailyFinanceReportGetListResponse> {
    return this.myOrganizationUserDailyFinanceReportGetListUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @ResolveField(() => OrganizationUser)
  async organizationUser(
    @Parent()
    organizationUserDailyFinanceReport: OrganizationUserDailyFinanceReport,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUserDailyFinanceReport.organizationUserId) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUserDailyFinanceReport.organizationUserId
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => XWahyooPaymentAdjustmentRequestDetail)
  async xWahyooPaymentAdjustmentRequestDetail(
    @Parent()
    organizationUserDailyFinanceReport: OrganizationUserDailyFinanceReport,
    @Loader(
      XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader.name
    )
    xWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader: DataLoader<
      String,
      XWahyooPaymentAdjustmentRequestDetail
    >
  ): Promise<XWahyooPaymentAdjustmentRequestDetail> {
    try {
      if (organizationUserDailyFinanceReport.id) {
        const response = await xWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader.load(
          organizationUserDailyFinanceReport.id
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => String)
  async organizationUserDailyFeeReportId(
    @Parent()
    organizationUserDailyFinanceReport: OrganizationUserDailyFinanceReport,
    @Loader(
      OrganizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader.name
    )
    organizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader: DataLoader<
      OrganizationUserDailyFinanceReport,
      OrganizationUserDailyFeeReport
    >
  ): Promise<String> {
    try {
      const response = await organizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader.load(
        organizationUserDailyFinanceReport
      );
      return response?.id;
    } catch (err) {
      throw err;
    }
  }
}
