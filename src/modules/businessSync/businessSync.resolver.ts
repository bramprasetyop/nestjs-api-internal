import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard, CurrentUser } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { BusinessSyncRequest } from './dto/businessSyncRequest.dto';
import { BusinessSyncResponse } from './dto/businessSyncResponse.dto';
import { BusinessSyncLogStatusRequest } from './dto/businessSyncLogStatusRequest.dto';
import { BusinessSyncLogStatusResponse } from './dto/businessSyncLogStatusResponse.dto';
import { BusinessSyncUseCase } from './useCases/businessSync.useCase';
import { BusinessSyncStatusUseCase } from './useCases/businessSyncStatus.useCase';
import { Permissions } from '../auth/auth.permission.decorator';

@Resolver()
export class BusinessSyncResolver {
  constructor(
    private readonly businessSyncUseCase: BusinessSyncUseCase,
    private readonly businessSyncStatusUseCase: BusinessSyncStatusUseCase
  ) {}

  @Query(() => BusinessSyncLogStatusResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_sync:read')
  async syncStatus(
    @Args() requestDTO: BusinessSyncLogStatusRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<BusinessSyncLogStatusResponse> {
    return this.businessSyncStatusUseCase.execute(requestDTO);
  }

  @Query(() => BusinessSyncResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_sync:read')
  async syncBusiness(
    @Args() requestDTO: BusinessSyncRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<BusinessSyncResponse> {
    return this.businessSyncUseCase.execute(requestDTO);
  }
}
