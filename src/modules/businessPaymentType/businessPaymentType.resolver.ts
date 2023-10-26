import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessPaymentTypeCreateRequest } from './dto/businessPaymentTypeCreateRequest.dto';
import { BusinessPaymentTypeGetListRequest } from './dto/businessPaymentTypeGetListRequest.dto';
import { BusinessPaymentTypeCreateUseCase } from './useCases/businessPaymentType.create.usecase';
import { BusinessPaymentType } from './dto/businessPaymentType.dto';
import { BusinessPaymentTypeGetListUseCase } from './useCases/businessPaymentType.getList.usecase';
import { BusinessPaymentTypeGetByIdUseCase } from './useCases/businessPaymentType.getById.usecase';
import { BusinessPaymentTypeUpdateUseCase } from './useCases/businessPaymentType.update.usecase';
import { BusinessPaymentTypeDeleteUseCase } from './useCases/businessPaymentType.delete.usecase';
import { BusinessPaymentTypeGetListResponse } from './dto/businessPaymentTypeGetListResponse.dto';
import { BusinessPaymentTypeUpdateRequest } from './dto/businessPaymentTypeUpdateRequest.dto';
import { Business } from '../business/dto/business.dto';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import DataLoader = require('dataloader');
import { BusinessSalesChannelPaymentType } from '../businessSalesChannel/dto/businessSalesChannelPaymentType.dto';
import { BusinessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader } from '../businessSalesChannel/businessSalesChannelPaymentType.batchByPaymentId.loader';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { UseGuards } from '@nestjs/common';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';

@Resolver(BusinessPaymentType)
export class BusinessPaymentTypeResolver {
  constructor(
    private readonly createUseCase: BusinessPaymentTypeCreateUseCase,
    private readonly getListUseCase: BusinessPaymentTypeGetListUseCase,
    private readonly getByIdUseCase: BusinessPaymentTypeGetByIdUseCase,
    private readonly updateUseCase: BusinessPaymentTypeUpdateUseCase,
    private readonly deleteUseCase: BusinessPaymentTypeDeleteUseCase
  ) {}

  @Mutation(() => BusinessPaymentType)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_payment_type:create')
  async businessPaymentTypeCreate(
    @Args('input') requestDTO: BusinessPaymentTypeCreateRequest
  ): Promise<BusinessPaymentType> {
    return this.createUseCase.execute(requestDTO);
  }

  @Query(() => BusinessPaymentType)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_payment_type:read')
  async businessPaymentTypeById(
    @Args('id') id: string
  ): Promise<BusinessPaymentType> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => BusinessPaymentTypeGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_payment_type:read')
  async businessPaymentTypeList(
    @Args() requestDTO: BusinessPaymentTypeGetListRequest
  ): Promise<BusinessPaymentTypeGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  @Mutation(() => BusinessPaymentType)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_payment_type:update')
  async BusinessPaymentTypeUpdate(
    @Args('input') requestDTO: BusinessPaymentTypeUpdateRequest
  ): Promise<BusinessPaymentType> {
    return this.updateUseCase.execute(requestDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_payment_type:delete')
  async BusinessPaymentTypeDelete(@Args('id') id: string): Promise<Boolean> {
    return this.deleteUseCase.execute(id);
  }

  // FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() BusinessPaymentType: BusinessPaymentType,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<Business['id'], Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        BusinessPaymentType.businessId
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
    @Parent() businessPaymentType: BusinessPaymentType,
    @Loader(BusinessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader.name)
    businessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader: DataLoader<
      string,
      BusinessSalesChannelPaymentType[]
    >
  ): Promise<BusinessSalesChannelPaymentType[]> {
    try {
      const response = await businessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader.load(
        businessPaymentType.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
