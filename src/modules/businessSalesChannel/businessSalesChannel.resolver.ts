import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver,
  Info
} from '@nestjs/graphql';
import { BusinessSalesChannelCreateRequest } from './dto/businessSalesChannelCreateRequest.dto';
import { BusinessSalesChannelGetListRequest } from './dto/businessSalesChannelGetListRequest.dto';
import { BusinessSalesChannelCreateUseCase } from './useCases/businessSalesChannel.create.usecase';
import { BusinessSalesChannel } from './dto/businessSalesChannel.dto';
import { BusinessSalesChannelGetListUseCase } from './useCases/businessSalesChannel.getList.usecase';
import { BusinessSalesChannelGetByIdUseCase } from './useCases/businessSalesChannel.getById.usecase';
import { BusinessSalesChannelUpdateUseCase } from './useCases/businessSalesChannel.update.usecase';
import { BusinessSalesChannelDeleteUseCase } from './useCases/businessSalesChannel.delete.usecase';
import { BusinessSalesChannelGetListResponse } from './dto/businessSalesChannelGetListResponse.dto';
import { BusinessSalesChannelUpdateRequest } from './dto/businessSalesChannelUpdateRequest.dto';
import { Business } from '../business/dto/business.dto';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import DataLoader = require('dataloader');
import { BusinessSalesChannelCategorySingleByIdLoader } from '../businessSalesChannelCategory/businessSalesChannelCategory.singleById.loader';
import { BusinessSalesChannelCategory } from '../businessSalesChannelCategory/dto/businessSalesChannelCategory.dto';
import { BusinessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader } from './businessSalesChannelPaymentType.batchBySalesChannelId.loader';
import { BusinessSalesChannelPaymentType } from './dto/businessSalesChannelPaymentType.dto';
import { BusinessSalesChannelMenuItem } from '../businessMenuItem/dto/businessSalesChannelMenuItem.dto';
import { BusinessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader } from '../businessMenuItem/businessSalesChannelMenuItem.batchByBusinessSalesChannelId.loader';
import { BusinessSalesChannelMenuCategory } from '../businessMenuCategory/dto/businessSalesChannelMenuCategory.dto';
import { BusinessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader } from '../businessMenuCategory/BusinessSalesChannelMenuCategory.batchByBusinessSalesChannelId.loader';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { UseGuards } from '@nestjs/common';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { GraphQLUtil } from 'src/commons/graphql.util';

@Resolver(BusinessSalesChannel)
export class BusinessSalesChannelResolver {
  constructor(
    private readonly createUseCase: BusinessSalesChannelCreateUseCase,
    private readonly getListUseCase: BusinessSalesChannelGetListUseCase,
    private readonly getByIdUseCase: BusinessSalesChannelGetByIdUseCase,
    private readonly updateUseCase: BusinessSalesChannelUpdateUseCase,
    private readonly deleteUseCase: BusinessSalesChannelDeleteUseCase
  ) {}

  // @Mutation(() => BusinessSalesChannel)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('business_sales_channel:create')
  // async businessSalesChannelCreate(
  //   @Args('input') requestDTO: BusinessSalesChannelCreateRequest
  // ): Promise<BusinessSalesChannel> {
  //   return this.createUseCase.execute(requestDTO);
  // }

  // @Query(() => BusinessSalesChannel)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('business_sales_channel:read')
  // async businessSalesChannelById(
  //   @Args('id') id: string
  // ): Promise<BusinessSalesChannel> {
  //   return this.getByIdUseCase.execute(id);
  // }

  @Query(() => BusinessSalesChannelGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_sales_channel:read')
  async businessSalesChannelList(
    @Args() requestDTO: BusinessSalesChannelGetListRequest
  ): Promise<BusinessSalesChannelGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  // @Mutation(() => BusinessSalesChannel)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('business_sales_channel:update')
  // async BusinessSalesChannelUpdate(
  //   @Args('input') requestDTO: BusinessSalesChannelUpdateRequest
  // ): Promise<BusinessSalesChannel> {
  //   return this.updateUseCase.execute(requestDTO);
  // }

  // @Mutation(() => Boolean)
  // @UseGuards(GqlAuthGuard, PermissionsGuard)
  // @Permissions('business_sales_channel:delete')
  // async BusinessSalesChannelDelete(@Args('id') id: string): Promise<Boolean> {
  //   return this.deleteUseCase.execute(id);
  // }

  // FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() BusinessSalesChannel: BusinessSalesChannel,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<Business['id'], Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        BusinessSalesChannel.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  // FIELD DATA LOADER
  @ResolveField(() => BusinessSalesChannelCategory)
  async businessSalesChannelCategory(
    @Parent() BusinessSalesChannel: BusinessSalesChannel,
    @Loader(BusinessSalesChannelCategorySingleByIdLoader.name)
    businessSalesChannelSingleByIdLoader: DataLoader<
      string,
      BusinessSalesChannelCategory
    >
  ): Promise<BusinessSalesChannelCategory> {
    try {
      const response = await businessSalesChannelSingleByIdLoader.load(
        BusinessSalesChannel.businessSalesChannelCategoryId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  // FIELD DATA LOADER
  @ResolveField(() => [BusinessSalesChannelPaymentType])
  async businessSalesChannelPaymentTypes(
    @Parent() businessSalesChannel: BusinessSalesChannel,
    @Loader(
      BusinessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader.name
    )
    businessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader: DataLoader<
      string,
      BusinessSalesChannelPaymentType[]
    >
  ): Promise<BusinessSalesChannelPaymentType[]> {
    try {
      let response = await businessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader.load(
        businessSalesChannel.id
      );
      // SORT BY sequence ASC
      response = response.sort(
        (a, b) =>
          a.businessPaymentType.sequence - b.businessPaymentType.sequence
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => [BusinessSalesChannelMenuItem])
  async businessSalesChannelMenuItems(
    @Parent() businessSalesChannel: BusinessSalesChannel,
    @Loader(
      BusinessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader.name
    )
    businessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader: DataLoader<
      string,
      BusinessSalesChannelMenuItem[]
    >,
    @Info() info
  ): Promise<BusinessSalesChannelMenuItem[]> {
    try {
      const rootResolver = GraphQLUtil.getParentResolverInfo(info);
      let response = await businessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader.load(
        businessSalesChannel.id
      );

      // only for resolver query syncBusiness
      if (
        rootResolver.key === 'syncBusiness' &&
        rootResolver.typename === 'Query'
      ) {
        response = response.filter(el => el.status === 'active');
      }
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => [BusinessSalesChannelMenuCategory])
  async businessSalesChannelMenuCategories(
    @Parent() businessSalesChannel: BusinessSalesChannel,
    @Loader(
      BusinessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader.name
    )
    businessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader: DataLoader<
      string,
      BusinessSalesChannelMenuCategory[]
    >,
    @Info() info
  ): Promise<BusinessSalesChannelMenuCategory[]> {
    try {
      const rootResolver = GraphQLUtil.getParentResolverInfo(info);
      let response = await businessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader.load(
        businessSalesChannel.id
      );
      // only for resolver query syncBusiness
      if (
        rootResolver.key === 'syncBusiness' &&
        rootResolver.typename === 'Query'
      ) {
        response = response.filter(el => el.status === 'active');
      }

      // SORT BY sequence ASC
      response = response.sort(
        (a, b) =>
          a.businessMenuCategory.sequence - b.businessMenuCategory.sequence
      );

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
