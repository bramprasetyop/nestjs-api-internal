import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessMenuModifierCreateRequest } from './dto/businessMenuModifierCreateRequest.dto';
import { BusinessMenuModifierGetListRequest } from './dto/businessMenuModifierGetListRequest.dto';
import { BusinessMenuModifierCreateUseCase } from './useCases/businessMenuModifier.create.usecase';
import { BusinessMenuModifier } from './dto/businessMenuModifier.dto';
import { BusinessMenuModifierGetListUseCase } from './useCases/businessMenuModifier.getList.usecase';
import { BusinessMenuModifierGetByIdUseCase } from './useCases/businessMenuModifier.getById.usecase';
import { BusinessMenuModifierUpdateUseCase } from './useCases/businessMenuModifier.update.usecase';
import { BusinessMenuModifierDeleteUseCase } from './useCases/businessMenuModifier.delete.usecase';
import { BusinessMenuModifierGetListResponse } from './dto/businessMenuModifierGetListResponse.dto';
import { BusinessMenuModifierUpdateRequest } from './dto/businessMenuModifierUpdateRequest.dto';
import { Business } from '../business/dto/business.dto';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import DataLoader = require('dataloader');
import { BusinessMenuModifierItem } from './dto/businessMenuModifierItem.dto';
import { BusinessMenuItemModifierItemBatchByMenuModifierIdLoader } from './businessMenuItemModifier.batchByMenuModifierId.loader';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';

@Resolver(BusinessMenuModifier)
export class BusinessMenuModifierResolver {
  constructor(
    private readonly createUseCase: BusinessMenuModifierCreateUseCase,
    private readonly getListUseCase: BusinessMenuModifierGetListUseCase,
    private readonly getByIdUseCase: BusinessMenuModifierGetByIdUseCase,
    private readonly updateUseCase: BusinessMenuModifierUpdateUseCase,
    private readonly deleteUseCase: BusinessMenuModifierDeleteUseCase
  ) {}

  @Mutation(() => BusinessMenuModifier)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_modifier:create')
  async businessMenuModifierCreate(
    @Args('input') requestDTO: BusinessMenuModifierCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessMenuModifier> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id,
      updatedBy: user.id
    });
  }

  @Query(() => BusinessMenuModifier)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_modifier:read')
  async businessMenuModifierById(
    @Args('id') id: string
  ): Promise<BusinessMenuModifier> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => BusinessMenuModifierGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_modifier:read')
  async businessMenuModifierList(
    @Args() requestDTO: BusinessMenuModifierGetListRequest
  ): Promise<BusinessMenuModifierGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  @Mutation(() => BusinessMenuModifier)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_modifier:update')
  async BusinessMenuModifierUpdate(
    @Args('input') requestDTO: BusinessMenuModifierUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessMenuModifier> {
    return this.updateUseCase.execute({ ...requestDTO, updatedBy: user.id });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_modifier:delete')
  async BusinessMenuModifierDelete(@Args('id') id: string): Promise<Boolean> {
    return this.deleteUseCase.execute(id);
  }

  // FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() businessMenuModifier: BusinessMenuModifier,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<Business['id'], Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        businessMenuModifier.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  @ResolveField(() => [BusinessMenuModifierItem])
  async businessModifierItems(
    @Parent() businessMenuModifier: BusinessMenuModifier,
    @Loader(BusinessMenuItemModifierItemBatchByMenuModifierIdLoader.name)
    businessMenuItemModifierItemBatchByMenuModifierIdLoader: DataLoader<
      string,
      BusinessMenuModifierItem[]
    >
  ): Promise<BusinessMenuModifierItem[]> {
    try {
      let response = await businessMenuItemModifierItemBatchByMenuModifierIdLoader.load(
        businessMenuModifier.id
      );
      // SORT BY sequence ASC
      response = response.sort((a, b) => a.sequence - b.sequence);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async creator(
    @Parent() businessMenuModifier: BusinessMenuModifier,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessMenuModifier.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessMenuModifier.createdBy
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
  async modifier(
    @Parent() businessMenuModifier: BusinessMenuModifier,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessMenuModifier.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessMenuModifier.updatedBy
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
