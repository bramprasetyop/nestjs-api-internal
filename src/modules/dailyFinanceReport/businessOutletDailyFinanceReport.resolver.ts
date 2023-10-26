import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { BusinessOutletSingleByIdLoader } from '../businessOutlet/businessOutlet.singleById.loader';
import { BusinessOutlet } from '../businessOutlet/dto/businessOutlet.dto';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { BusinessOutletDailyFinanceReport } from './dto/businessOutletDailyFinanceReport.dto';
import { BusinessOutletDailyFinanceReportGetListRequest } from './dto/businessOutletDailyFinanceReportGetListRequest.dto';
import { BusinessOutletDailyFinanceReportGetListResponse } from './dto/businessOutletDailyFinanceReportGetListResponse.dto';
import { BusinessOutletDailyFinanceReportSalesChannelGetListRequest } from './dto/businessOutletDailyFinanceReportSalesChannelGetListRequest.dto';
import { BusinessOutletDailyFinanceReportSalesChannelGetListResponse } from './dto/businessOutletDailyFinanceReportSalesChannelGetListResponse.dto';
import { BusinessOutletDailyFinanceReportMenuItemGetListRequest } from './dto/businessOutletDailyFinanceReportMenuItemGetListRequest.dto';
import { BusinessOutletDailyFinanceReportMenuItemGetListResponse } from './dto/businessOutletDailyFinanceReportMenuItemGetListResponse.dto';
import { OrganizationUserDailyFinanceReport } from './dto/organizationUserDailyFinanceReport.dto';
import { BusinessOutletDailyFinanceReportGetByIdUseCase } from './useCases/businessOutletDailyFinanceReport.getById.usecase';
import { BusinessOutletDailyFinanceReportGetListUseCase } from './useCases/businessOutletDailyFinanceReport.getList.usecase';
import { BusinessOutletDailyFinanceReportGetReportListBySalesChannelUseCase } from './useCases/businessOutletDailyFinanceReport.getReportListBySalesChannel.usecase';
import { BusinessOutletDailyFinanceReportGetReportListByMenuItemUseCase } from './useCases/businessOutletDailyFinanceReport.getReportListByMenuItem.usecase';

@Resolver(BusinessOutletDailyFinanceReport)
export class BusinessOutletDailyFinanceReportResolver {
  constructor(
    private readonly businessOutletDailyFinanceReportGetByIdUseCase: BusinessOutletDailyFinanceReportGetByIdUseCase,
    private readonly businessOutletDailyFinanceReportGetListUseCase: BusinessOutletDailyFinanceReportGetListUseCase,
    private readonly businessOutletDailyFinanceReportGetReportListBySalesChannelUseCase: BusinessOutletDailyFinanceReportGetReportListBySalesChannelUseCase,
    private readonly businessOutletDailyFinanceReportGetReportListByMenuItemUseCase: BusinessOutletDailyFinanceReportGetReportListByMenuItemUseCase
  ) {}

  @Query(() => BusinessOutletDailyFinanceReport)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_daily_finance_report:read')
  async businessOutletDailyFinanceReportById(
    @Args('id') id: string
  ): Promise<BusinessOutletDailyFinanceReport> {
    return this.businessOutletDailyFinanceReportGetByIdUseCase.execute(id);
  }

  @Query(() => BusinessOutletDailyFinanceReportGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_daily_finance_report:read')
  async businessOutletDailyFinanceReportList(
    @Args() requestDTO: BusinessOutletDailyFinanceReportGetListRequest
  ): Promise<BusinessOutletDailyFinanceReportGetListResponse> {
    return this.businessOutletDailyFinanceReportGetListUseCase.execute(
      requestDTO
    );
  }

  @Query(() => BusinessOutletDailyFinanceReportSalesChannelGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_daily_finance_report:read')
  async businessOutletDailyFinanceReportSalesChannelList(
    @Args()
    requestDTO: BusinessOutletDailyFinanceReportSalesChannelGetListRequest
  ): Promise<BusinessOutletDailyFinanceReportSalesChannelGetListResponse> {
    return this.businessOutletDailyFinanceReportGetReportListBySalesChannelUseCase.execute(
      requestDTO
    );
  }

  @Query(() => BusinessOutletDailyFinanceReportMenuItemGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_daily_finance_report:read')
  async businessOutletDailyFinanceReportMenuItemList(
    @Args()
    requestDTO: BusinessOutletDailyFinanceReportMenuItemGetListRequest
  ): Promise<BusinessOutletDailyFinanceReportMenuItemGetListResponse> {
    return this.businessOutletDailyFinanceReportGetReportListByMenuItemUseCase.execute(
      requestDTO
    );
  }

  @ResolveField(() => OrganizationUser)
  async organizationUser(
    @Parent()
    businessOutletDailyFinanceReport: BusinessOutletDailyFinanceReport,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessOutletDailyFinanceReport.organizationUserId) {
        const response = await organizationUserSingleByIdLoader.load(
          businessOutletDailyFinanceReport.organizationUserId
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => BusinessOutlet)
  async businessOutlet(
    @Parent()
    businessOutletDailyFinanceReport: BusinessOutletDailyFinanceReport,
    @Loader(BusinessOutletSingleByIdLoader.name)
    businessOutletSingleByIdLoader: DataLoader<String, BusinessOutlet>
  ): Promise<BusinessOutlet> {
    try {
      if (businessOutletDailyFinanceReport.businessOutletId) {
        const response = await businessOutletSingleByIdLoader.load(
          businessOutletDailyFinanceReport.businessOutletId
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => OrganizationUserDailyFinanceReport)
  async organizationUserDailyFinanceReport(
    @Parent()
    businessOutletDailyFinanceReport: BusinessOutletDailyFinanceReport
  ): Promise<BusinessOutlet> {
    throw new Error('Method not implemented yet');
  }
}
