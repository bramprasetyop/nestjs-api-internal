import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { BusinessOutletPropertyBatchByDailyTransferOrganizationUserILoader } from '../businessOutletProperty/businessOutletProperty.batchByDailyTransferOrganizationUserId.loader';
import { BusinessOutletProperty } from '../businessOutletProperty/dto/businessOutletProperty.dto';
import { OrganizationUserDailyFeeAssignment } from './dto/organizationUserDailyFeeAssignment.dto';
import { OrganizationUserDailyFeeAssignmentGetListRequest } from './dto/organizationUserDailyFeeAssignmentGetListRequest.dto';
import { OrganizationUserDailyFeeAssignmentGetListResponse } from './dto/organizationUserDailyFeeAssignmentGetListResponse.dto';
import { OrganizationUserDailyFeeAssignmentUpdateRequest } from './dto/organizationUserDailyFeeAssignmentUpdateRequest.dto';
import { XWahyooPaymentAdjustmentRequestDetailRepository } from './repositories/xWahyooPaymentAdjustmentRequestDetail.repository';
import { OrganizationUserDailyFeeAssignmentGetListUseCase } from './useCases/organizationUserDailyFeeAssignment.getList.usecase';
import { OrganizationUserDailyFeeAssignmentUpdateUseCase } from './useCases/organizationUserDailyFeeAssignment.update.usecase';

@Resolver(OrganizationUserDailyFeeAssignment)
export class OrganizationUserDailyFeeAssignmentResolver {
  constructor(
    private readonly xWahyooPaymentAdjustmentRequestDetailRepository: XWahyooPaymentAdjustmentRequestDetailRepository,
    private readonly organizationUserDailyFeeAssignmentGetListUseCase: OrganizationUserDailyFeeAssignmentGetListUseCase,
    private readonly organizationUserDailyFeeAssignmentUpdateUseCase: OrganizationUserDailyFeeAssignmentUpdateUseCase
  ) {}

  @Query(() => OrganizationUserDailyFeeAssignmentGetListResponse)
  @Permissions('organization_user_daily_fee_assignment:read')
  async organizationUserDailyFeeAssignmentList(
    @Args() requestDTO: OrganizationUserDailyFeeAssignmentGetListRequest
  ): Promise<OrganizationUserDailyFeeAssignmentGetListResponse> {
    return this.organizationUserDailyFeeAssignmentGetListUseCase.execute(
      requestDTO
    );
  }

  @Mutation(() => OrganizationUserDailyFeeAssignment)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('organization_user_daily_fee_assignment:update')
  async organizationUserDailyFeeAssignmentUpdate(
    @Args('input') requestDTO: OrganizationUserDailyFeeAssignmentUpdateRequest
  ): Promise<OrganizationUserDailyFeeAssignment> {
    return this.organizationUserDailyFeeAssignmentUpdateUseCase.execute(
      requestDTO
    );
  }

  @ResolveField(() => [BusinessOutletProperty])
  async linkedBusinessOutletProperties(
    @Parent()
    organizationUserDailyFeeAssignment: OrganizationUserDailyFeeAssignment,
    @Loader(
      BusinessOutletPropertyBatchByDailyTransferOrganizationUserILoader.name
    )
    businessOutletPropertyBatchByDailyTransferOrganizationUserILoader: DataLoader<
      String,
      BusinessOutletProperty[]
    >
  ): Promise<BusinessOutletProperty[]> {
    try {
      const response = await businessOutletPropertyBatchByDailyTransferOrganizationUserILoader.load(
        organizationUserDailyFeeAssignment.id
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField()
  async lastDailyFeeStatus(
    @Parent()
    organizationUserDailyFeeAssignment: OrganizationUserDailyFeeAssignment
  ): Promise<String> {
    try {
      const paymentAdjustment = await this.xWahyooPaymentAdjustmentRequestDetailRepository.findLastStatusByOrganizationUserByOrganizationUserDailyFeeReportId(
        organizationUserDailyFeeAssignment.id
      );
      if (paymentAdjustment) {
        return paymentAdjustment.xPaymentAdjustmentRequestStatus;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
