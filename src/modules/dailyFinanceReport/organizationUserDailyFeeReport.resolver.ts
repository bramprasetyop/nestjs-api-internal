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
import { OrganizationUserDailyFeeReport } from './dto/organizationUserDailyFeeReport.dto';
import { XWahyooPaymentAdjustmentRequestDetail } from './dto/xWahyooPaymentAdjustmentRequestDetail.dto';
import { OrganizationUserDailyFeeReportGetByIdUseCase } from './useCases/organizationUserDailyFeeReport.getById.usecase';
import { XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader } from './xWahyooPaymentAdjustmentRequestDetail.singleByOrganizationUserDailyFeeReportId.loader';

@Resolver(OrganizationUserDailyFeeReport)
export class OrganizationUserDailyFeeReportResolver {
  constructor(
    private readonly organizationUserDailyFeeReportGetByIdUseCase: OrganizationUserDailyFeeReportGetByIdUseCase
  ) {}

  @Query(() => OrganizationUserDailyFeeReport)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('organization_user_daily_finance_report:read')
  async organizationUserDailyFeeReportById(
    @Args('id') id: string,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<OrganizationUserDailyFeeReport> {
    return this.organizationUserDailyFeeReportGetByIdUseCase
      .with(currentUser)
      .execute(id);
  }

  @ResolveField(() => OrganizationUser)
  async organizationUser(
    @Parent()
    organizationUserDailyFeeReport: OrganizationUserDailyFeeReport,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUserDailyFeeReport.organizationUserId) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUserDailyFeeReport.organizationUserId
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
    organizationUserDailyFeeReport: OrganizationUserDailyFeeReport,
    @Loader(
      XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader.name
    )
    xWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader: DataLoader<
      String,
      XWahyooPaymentAdjustmentRequestDetail
    >
  ): Promise<XWahyooPaymentAdjustmentRequestDetail> {
    try {
      if (organizationUserDailyFeeReport.id) {
        const response = await xWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader.load(
          organizationUserDailyFeeReport.id
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
