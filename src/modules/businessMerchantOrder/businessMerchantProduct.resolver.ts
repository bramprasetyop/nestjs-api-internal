import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessMerchantProduct } from './dto/businessMerchantProduct.dto';
import { Business } from '../business/dto/business.dto';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { BusinessMerchantProductGetListUseCase } from './useCases/businessMerchantProduct.getList.usecase';
import { BusinessMerchantProductGetListRequest } from './dto/businessMerchantProductGetListRequest.dto';
import { BusinessMerchantProductGetListResponse } from './dto/businessMerchantProductGetListResponse.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';

@Resolver(BusinessMerchantProduct)
export class BusinessMerchantProductResolver {
  constructor(
    private readonly getListUseCase: BusinessMerchantProductGetListUseCase
  ) {}

  // @Query(() => BusinessMerchantProductGetListResponse)
  // @UseGuards(GqlAuthGuard)
  // async businessMerchantProductListPublic(
  //   @Args() requestDTO: BusinessMerchantProductGetListRequest
  // ): Promise<BusinessMerchantProductGetListResponse> {
  //   return this.getListUseCase.execute(requestDTO);
  // }

  //  FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() businessMerchantProduct: BusinessMerchantProduct,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        businessMerchantProduct.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
