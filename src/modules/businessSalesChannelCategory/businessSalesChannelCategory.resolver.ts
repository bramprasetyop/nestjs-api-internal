import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessSalesChannelCategoryCreateRequest } from './dto/businessSalesChannelCategoryCreateRequest.dto';
import { BusinessSalesChannelCategoryGetListRequest } from './dto/businessSalesChannelCategoryGetListRequest.dto';
import { BusinessSalesChannelCategoryCreateUseCase } from './useCases/businessSalesChannelCategory.create.usecase';
import { BusinessSalesChannelCategory } from './dto/businessSalesChannelCategory.dto';
import { BusinessSalesChannelCategoryGetListUseCase } from './useCases/businessSalesChannelCategory.getList.usecase';
import { BusinessSalesChannelCategoryGetByIdUseCase } from './useCases/businessSalesChannelCategory.getById.usecase';
import { BusinessSalesChannelCategoryUpdateUseCase } from './useCases/businessSalesChannelCategory.update.usecase';
import { BusinessSalesChannelCategoryDeleteUseCase } from './useCases/businessSalesChannelCategory.delete.usecase';
import { BusinessSalesChannelCategoryGetListResponse } from './dto/businessSalesChannelCategoryGetListResponse.dto';
import { BusinessSalesChannelCategoryUpdateRequest } from './dto/businessSalesChannelCategoryUpdateRequest.dto';
import { Business } from '../business/dto/business.dto';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import DataLoader = require('dataloader');
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { UseGuards } from '@nestjs/common';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
@Resolver(BusinessSalesChannelCategory)
export class BusinessSalesChannelCategoryResolver {
  constructor(
    private readonly createUseCase: BusinessSalesChannelCategoryCreateUseCase,
    private readonly getListUseCase: BusinessSalesChannelCategoryGetListUseCase,
    private readonly getByIdUseCase: BusinessSalesChannelCategoryGetByIdUseCase,
    private readonly updateUseCase: BusinessSalesChannelCategoryUpdateUseCase,
    private readonly deleteUseCase: BusinessSalesChannelCategoryDeleteUseCase
  ) {}

  @Mutation(() => BusinessSalesChannelCategory)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_sales_channel_category:create')
  async businessSalesChannelCategoryCreate(
    @Args('input') requestDTO: BusinessSalesChannelCategoryCreateRequest
  ): Promise<BusinessSalesChannelCategory> {
    return this.createUseCase.execute(requestDTO);
  }

  @Query(() => BusinessSalesChannelCategory)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_sales_channel_category:read')
  async businessSalesChannelCategoryById(
    @Args('id') id: string
  ): Promise<BusinessSalesChannelCategory> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => BusinessSalesChannelCategoryGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_sales_channel_category:read')
  async businessSalesChannelCategoryList(
    @Args() requestDTO: BusinessSalesChannelCategoryGetListRequest
  ): Promise<BusinessSalesChannelCategoryGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  @Mutation(() => BusinessSalesChannelCategory)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_sales_channel_category:update')
  async BusinessSalesChannelCategoryUpdate(
    @Args('input') requestDTO: BusinessSalesChannelCategoryUpdateRequest
  ): Promise<BusinessSalesChannelCategory> {
    return this.updateUseCase.execute(requestDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_sales_channel_category:delete')
  async BusinessSalesChannelCategoryDelete(
    @Args('id') id: string
  ): Promise<Boolean> {
    return this.deleteUseCase.execute(id);
  }

  // FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() BusinessSalesChannelCategory: BusinessSalesChannelCategory,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<Business['id'], Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        BusinessSalesChannelCategory.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
