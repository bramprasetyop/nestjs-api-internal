import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver,
  ID
} from '@nestjs/graphql';
import { BusinessOutletQualityControl } from './dto/businessOutletQualityControl.dto';
import { BusinessOutletQualityControlMarksAsReviewedUseCase } from './useCases/businessOutletQualityControl.markAsReviewed.usecase';
import { Organization } from '../organization/dto/organization.dto';
import { Loader } from 'src/commons/loader';
import { OrganizationSingleByIdLoader } from '../organization/organization.singleById.loader';
import DataLoader = require('dataloader');
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../auth/auth.permission.decorator';
import { BusinessOutletQualityControlGetByIdUseCase } from './useCases/businessOutletQualityControl.getById.usecase';
import { BusinessOutletQualityControlGetListRequest } from './dto/businessOutletQualityControlGetListRequest.dto';
import { BusinessOutletQualityControlGetListUseCase } from './useCases/businessOutletQualityControl.getList.usecase';
import { BusinessOutletQualityControlGetListResponse } from './dto/businessOutletQualityControlGetListResponse.dto';
import { MyBusinessOutletQualityControlGetListUseCase } from './useCases/myBusinessOutletQualityControl.getList.usecase';
import { BusinessOutletQualityControlSubmitRequest } from './dto/businessOutletQualityControlSubmitRequest.dto';
import { BusinessOutletQualityControlSubmitUseCase } from './useCases/businessOutletQualityControl.submit.usecase';
import { BusinessOutletQualityControlGetSummaryUseCase } from './useCases/businessOutletQualityControl.getSummary.usecase';
import { BusinessOutletQualityControlGetSummaryResponse } from './dto/businessOutletQualityControlGetSummaryResponse.dto';
import { BusinessOutlet } from '../businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletSingleByIdLoader } from '../businessOutlet/businessOutlet.singleById.loader';
import { Business } from '../business/dto/business.dto';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';

@Resolver(BusinessOutletQualityControl)
export class BusinessOutletQualityControlResolver {
  constructor(
    private readonly businessOutletQualityControlMarksAsReviewedUseCase: BusinessOutletQualityControlMarksAsReviewedUseCase,
    private readonly businessOutletQualityControlSubmitUseCase: BusinessOutletQualityControlSubmitUseCase,
    private readonly businessOutletQualityControlGetByIdUseCase: BusinessOutletQualityControlGetByIdUseCase,
    private readonly businessOutletQualityControlGetListUseCase: BusinessOutletQualityControlGetListUseCase,
    private readonly businessOutletQualityControlGetSummaryUseCase: BusinessOutletQualityControlGetSummaryUseCase,
    private readonly myBusinessOutletQualityControlGetListUseCase: MyBusinessOutletQualityControlGetListUseCase
  ) {}

  @Mutation(() => BusinessOutletQualityControl)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_quality_control:update')
  async businessOutletQualityControlMarksAsReviewed(
    @Args('id') id: string,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessOutletQualityControl> {
    return this.businessOutletQualityControlMarksAsReviewedUseCase
      .with(user)
      .execute(id);
  }

  // @Mutation(() => BusinessOutletQualityControl)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('my_business_outlet_quality_control:update')
  // async businessOutletQualityControlSubmit(
  //   @Args() input: BusinessOutletQualityControlSubmitRequest,
  //   @CurrentUser() user: ICurrentUserArgs
  // ): Promise<BusinessOutletQualityControl> {
  //   return this.businessOutletQualityControlSubmitUseCase.execute(input);
  // }

  @Query(() => BusinessOutletQualityControl)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('my_business_outlet_quality_control:read')
  async businessOutletQualityControlById(
    @Args('id') id: string,
    @CurrentUser() user: ICurrentUserArgs
  ) {
    return this.businessOutletQualityControlGetByIdUseCase.execute(id);
  }

  @Query(() => BusinessOutletQualityControlGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_quality_control:read')
  async businessOutletQualityControlList(
    @Args() input: BusinessOutletQualityControlGetListRequest,
    @CurrentUser() user: ICurrentUserArgs
  ) {
    return this.businessOutletQualityControlGetListUseCase.execute(input);
  }

  @Query(() => BusinessOutletQualityControlGetSummaryResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_quality_control:read')
  async businessOutletQualityControlSummary(
    @Args('businessId', { type: () => ID }) businessId: string,
    @CurrentUser() user: ICurrentUserArgs
  ) {
    return this.businessOutletQualityControlGetSummaryUseCase.execute(
      businessId
    );
  }

  // @Query(() => BusinessOutletQualityControlGetListResponse)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('my_business_outlet_quality_control:read')
  // async myBusinessOutletQualityControlList(
  //   @Args() requestDTO: BusinessOutletQualityControlGetListRequest,
  //   @CurrentUser() user: ICurrentUserArgs
  // ) {
  //   return this.myBusinessOutletQualityControlGetListUseCase
  //     .with(user)
  //     .execute(requestDTO);
  // }

  @ResolveField(() => BusinessOutlet)
  async businessOutlet(
    @Parent() businessOutletQualityControl: BusinessOutletQualityControl,
    @Loader(BusinessOutletSingleByIdLoader.name)
    businessOutletSingleByIdLoader: DataLoader<string, BusinessOutlet>
  ): Promise<BusinessOutlet> {
    try {
      const response = await businessOutletSingleByIdLoader.load(
        businessOutletQualityControl.businessOutletId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => Business)
  async business(
    @Parent() businessOutletQualityControl: BusinessOutletQualityControl,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      if (businessOutletQualityControl.businessId) {
        const response = await businessSingleByIdLoader.load(
          businessOutletQualityControl.businessId
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
