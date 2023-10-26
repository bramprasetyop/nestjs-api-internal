import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessPromoUpdateRequest } from './dto/businessPromoUpdateRequest.dto';
import { BusinessPromoCreateRequest } from './dto/businessPromoCreateRequest.dto';
import { BusinessPromoClosedRequest } from './dto/businessPromoClosedRequest.dto';
import { BusinessPromoGetListRequest } from './dto/businessPromoGetListRequest.dto';
import { BusinessPromoCreateUseCase } from './useCases/businessPromo.create.usecase';
import { BusinessPromo } from './dto/businessPromo.dto';
import { OrganizationUser } from '../user/dto/user.dto';
import { BusinessPromoGetListUseCase } from './useCases/businessPromo.getList.usecase';
import { BusinessPromoGetByIdUseCase } from './useCases/businessPromo.getById.usecase';
import { BusinessPromoUpdateUseCase } from './useCases/businessPromo.update.usecase';
import { BusinessPromoClosedUseCase } from './useCases/businessPromo.closed.usecase';
import { BusinessPromoListResponse } from './dto/businessPromoResponse.dto';
import { Business } from '../business/dto/business.dto';
import { BusinessPromoMenuItem } from './dto/businessPromoMenuItem.dto';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { BusinessPromoMenuItemSingleByIdLoader } from './businessPromoMenuItem.singleById.loader';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import DataLoader = require('dataloader');
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { UseGuards } from '@nestjs/common';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
@Resolver(BusinessPromo)
export class BusinessPromoResolver {
  constructor(
    private readonly createUseCase: BusinessPromoCreateUseCase,
    private readonly getListUseCase: BusinessPromoGetListUseCase,
    private readonly getByIdUseCase: BusinessPromoGetByIdUseCase,
    private readonly updateUseCase: BusinessPromoUpdateUseCase,
    private readonly closedUseCase: BusinessPromoClosedUseCase
  ) {}

  @Mutation(() => BusinessPromo)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_promo:create')
  async businessPromoCreate(
    @Args('input') requestDTO: BusinessPromoCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessPromo> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id
    });
  }

  @Query(() => BusinessPromo)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_promo:read')
  async businessPromoById(@Args('id') id: string): Promise<BusinessPromo> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => BusinessPromoListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_promo:read')
  async businessPromoList(
    @Args() requestDTO: BusinessPromoGetListRequest
  ): Promise<BusinessPromoListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  @Mutation(() => BusinessPromo)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_promo:update')
  async businessPromoUpdate(
    @Args('input') requestDTO: BusinessPromoUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessPromo> {
    return this.updateUseCase.execute({
      ...requestDTO,
      updatedBy: user.id
    });
  }

  @Mutation(() => BusinessPromo)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_promo:update')
  async businessPromoCloseById(
    @Args('input') requestDTO: BusinessPromoClosedRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessPromo> {
    return this.closedUseCase.execute({
      ...requestDTO,
      closedBy: user.id
    });
  }

  // FIELD DATA LOADER

  @ResolveField(() => [BusinessPromoMenuItem])
  async businessPromoMenuItems(
    @Parent() BusinessPromo: BusinessPromo,
    @Loader(BusinessPromoMenuItemSingleByIdLoader.name)
    businessPromoMenuItemSingleByIdLoader: DataLoader<
      String,
      BusinessPromoMenuItem[]
    >
  ): Promise<BusinessPromoMenuItem[]> {
    try {
      const response = await businessPromoMenuItemSingleByIdLoader.load(
        BusinessPromo.id
      );

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => Business)
  async business(
    @Parent() BusinessPromo: BusinessPromo,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<Business['id'], Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        BusinessPromo.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async publishedByUser(
    @Parent() BusinessPromo: BusinessPromo,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (BusinessPromo.publishedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          BusinessPromo.publishedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async closedByUser(
    @Parent() BusinessPromo: BusinessPromo,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (BusinessPromo.closedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          BusinessPromo.closedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async createdByUser(
    @Parent() BusinessPromo: BusinessPromo,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (BusinessPromo.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          BusinessPromo.createdBy
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async updatedByUser(
    @Parent() BusinessPromo: BusinessPromo,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (BusinessPromo.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          BusinessPromo.updatedBy
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
