import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { Business } from './dto/business.dto';
import { Organization } from '../organization/dto/organization.dto';
import { BusinessCreateRequest } from './dto/businessCreateRequest.dto';
import { BusinessCreateUseCase } from './useCases/business.create.usecase';
import { BusinessUpdateUseCase } from './useCases/business.update.usecase';
import { BusinessDeleteUseCase } from './useCases/business.delete.usecase';
import { BusinessUpdateRequest } from './dto/businessUpdateRequest.dto';
import { BusinessGetListRequest } from './dto/businessGetListRequest.dto';
import { BusinessGetListUseCase } from './useCases/business.getList.usecase';
import { BusinessGetByIdUseCase } from './useCases/business.getById.usecase';
import { BusinessGetListResponse } from './dto/businessGetListResponse.dto';
import { OrganizationSingleByIdLoader } from '../organization/organization.singleById.loader';
import { BusinessGetListPublicUseCase } from './useCases/business.getList.public.usecase';
import { BusinessGetByIdPublicUseCase } from './useCases/business.getById.public.usecase';
import { BusinessLead } from '../businessLead/dto/businessLead.dto';
import { BusinessLeadBatchByBusinessIdLoader } from '../businessLead/businessLead.batchByBusinessId.loader';
import { BusinessMerchantProduct } from '../businessMerchantOrder/dto/businessMerchantProduct.dto';
import { BusinessMerchantProductBatchByBusinessIdLoader } from '../businessMerchantOrder/businessMerchantProduct.batchByBusinessId.loader';

@Resolver(Business)
export class BusinessResolver {
  constructor(
    private readonly createUseCase: BusinessCreateUseCase,
    private readonly getListUseCase: BusinessGetListUseCase,
    private readonly getByIdUseCase: BusinessGetByIdUseCase,
    private readonly updateUseCase: BusinessUpdateUseCase,
    private readonly deleteUseCase: BusinessDeleteUseCase,
    private readonly getListPublicUseCase: BusinessGetListPublicUseCase,
    private readonly getByIdPublicUseCase: BusinessGetByIdPublicUseCase
  ) {}

  // @Mutation(() => Business)
  // async businessCreate(
  //   @Args('input') requestDTO: BusinessCreateRequest
  // ): Promise<Business> {
  //   return this.createUseCase.execute(requestDTO);
  // }

  @Query(() => Business)
  async businessById(@Args('id') id: string): Promise<Business> {
    return this.getByIdUseCase.execute(id);
  }

  // @Query(() => Business)
  // async businessByIdPublic(@Args('id') id: string): Promise<Business> {
  //   return this.getByIdPublicUseCase.execute(id);
  // }

  @Query(() => BusinessGetListResponse)
  async businessList(
    @Args() requestDTO: BusinessGetListRequest
  ): Promise<BusinessGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  // @Query(() => BusinessGetListResponse)
  // async businessListPublic(
  //   @Args() requestDTO: BusinessGetListRequest
  // ): Promise<BusinessGetListResponse> {
  //   return this.getListPublicUseCase.execute(requestDTO);
  // }

  // @Mutation(() => Business)
  // async BusinessUpdate(
  //   @Args('input') requestDTO: BusinessUpdateRequest
  // ): Promise<Business> {
  //   return this.updateUseCase.execute(requestDTO);
  // }

  // @Mutation(() => Boolean)
  // async BusinessDelete(@Args('id') id: string): Promise<Boolean> {
  //   return this.deleteUseCase.execute(id);
  // }

  // FIELD DATA LOADER
  @ResolveField(() => Organization)
  async organization(
    @Parent() Business: Business,
    @Loader(OrganizationSingleByIdLoader.name)
    organizationSingleByIdLoader: DataLoader<Organization['id'], Organization>
  ): Promise<Organization> {
    try {
      const response = await organizationSingleByIdLoader.load(
        Business.organizationId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => BusinessLead)
  async businessLead(
    @Parent() Business: Business,
    @Loader(BusinessLeadBatchByBusinessIdLoader.name)
    businessLeadBatchByBusinessIdLoader: DataLoader<
      BusinessLead['id'],
      BusinessLead
    >
  ): Promise<BusinessLead> {
    try {
      const response = await businessLeadBatchByBusinessIdLoader.load(
        Business.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => BusinessMerchantProduct)
  async businessMerchantProducts(
    @Parent() Business: Business,
    @Loader(BusinessMerchantProductBatchByBusinessIdLoader.name)
    businessMerchantProductSingleByBusinessIdLoader: DataLoader<
      BusinessMerchantProduct['id'],
      BusinessMerchantProduct
    >
  ): Promise<BusinessMerchantProduct> {
    try {
      const response = await businessMerchantProductSingleByBusinessIdLoader.load(
        Business.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
