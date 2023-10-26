import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { Organization } from '../organization/dto/organization.dto';
import { Loader } from 'src/commons/loader';
import { OrganizationSingleByIdLoader } from '../organization/organization.singleById.loader';
import DataLoader = require('dataloader');
import { BusinessProperty } from './dto/businessProperty.dto';
import { BusinessPropertyByBusinessIdUseCase } from './useCases/businessProperty.ByBusinessId.usecase';
import { Business } from '../business/dto/business.dto';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../auth/auth.permission.decorator';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';

@Resolver(BusinessProperty)
export class BusinessPropertyResolver {
  constructor(
    private readonly businessPropertyByBusinessIdUseCase: BusinessPropertyByBusinessIdUseCase
  ) {}

  @Query(() => BusinessProperty)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_properties:read')
  async businessPropertyByBusinessId(
    @Args('businessId') businessId: string
  ): Promise<BusinessProperty> {
    return this.businessPropertyByBusinessIdUseCase.execute(businessId);
  }

  // FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() businessProperty: BusinessProperty,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<String, Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        businessProperty.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
