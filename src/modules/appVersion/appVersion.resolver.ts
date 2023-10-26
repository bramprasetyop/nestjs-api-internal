import { UseGuards } from '@nestjs/common';
import { AppVersion } from './dto/appVersion.dto';
import { Permissions } from '../auth/auth.permission.decorator';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { AppVersionListRequest } from './dto/appVersionListRequest.dto';
import { AppVersionByIdUseCase } from './useCases/appVersion.appVersionById.usecase';
import { AppVersionListResponse } from './dto/appVersionListResponse.dto';
import { AppVersionCreateRequest } from './dto/appVersionCreateRequest.dto';
import { AppVersionCreateUseCase } from './useCases/appVersion.appVersionCreate.usecase';
import { AppVersionUpdateUseCase } from './useCases/appVersion.appVersionUpdate.usecase';
import { AppVersionDeleteUseCase } from './useCases/appVersion.appVersionDelete.usecase';
import { AppVersionUpdateRequest } from './dto/appVersionUpdateRequest.tdo';
import { AppVersionGetListUseCase } from './useCases/appVersion.appVersionList.usecase';
import { AppVersionFindLatestAppVersionUseCase } from './useCases/appVersion.appVersionFindLatestAppVersion.usecase';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppVersionResolver {
  constructor(
    private readonly appVersionGetListUseCase: AppVersionGetListUseCase,
    private readonly appVersionByIdUseCase: AppVersionByIdUseCase,
    private readonly appVersionCreateUseCase: AppVersionCreateUseCase,
    private readonly appVersionUpdateUseCase: AppVersionUpdateUseCase,
    private readonly appVersionDeleteuseCase: AppVersionDeleteUseCase,
    private readonly appVersionFindLatestAppversionUseCase: AppVersionFindLatestAppVersionUseCase
  ) {}

  @Query(() => AppVersionListResponse)
  async appVersionList(
    @Args() requestDTO: AppVersionListRequest
  ): Promise<AppVersionListResponse> {
    return this.appVersionGetListUseCase.execute(requestDTO);
  }

  @Query(() => AppVersion)
  async appVersionById(@Args('id') id: string): Promise<AppVersion> {
    return this.appVersionByIdUseCase.execute(id);
  }

  // @Query(() => AppVersion)
  // async latestAppVersion(): Promise<AppVersion> {
  //   return await this.appVersionFindLatestAppversionUseCase.execute();
  // }

  @Mutation(() => AppVersion)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('app_version:create')
  async appVersionCreate(
    @Args('input') requestDTO: AppVersionCreateRequest
  ): Promise<AppVersion> {
    return await this.appVersionCreateUseCase.execute(requestDTO);
  }

  @Mutation(() => AppVersion)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('app_version:update')
  async appVersionUpdate(
    @Args('input') requestDTO: AppVersionUpdateRequest
  ): Promise<AppVersion> {
    return await this.appVersionUpdateUseCase.execute(requestDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('app_version:delete')
  async appVersionDelete(@Args('id') id: string): Promise<any> {
    return await this.appVersionDeleteuseCase.execute(id);
  }
}
