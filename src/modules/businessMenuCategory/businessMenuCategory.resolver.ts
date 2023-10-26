import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessMenuCategoryGetListRequest } from './dto/businessMenuCategoryGetListRequest.dto';
import { BusinessMenuCategory } from './dto/businessMenuCategory.dto';
import { BusinessMenuCategoryGetListUseCase } from './useCases/businessMenuCategory.getList.usercase';
import { BusinessMenuCategoryGetByIdUseCase } from './useCases/businessMenuCategory.getById.usecase';
import { BusinessMenuCategoryCreateUseCase } from './useCases/businessMenuCategory.create.usecase';
import { BusinessMenuCategoryUpdateUseCase } from './useCases/businessMenuCategory.update.usecase';
import { BusinessMenuCategoryDeleteUseCase } from './useCases/businessMenuCategory.delete.usecase';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { Business } from '../business/dto/business.dto';
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../auth/auth.permission.decorator';
import { OrganizationUser } from '../user/dto/user.dto';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { BusinessSalesChannelMenuCategory } from './dto/businessSalesChannelMenuCategory.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { BusinessMenuCategoryCreateRequest } from './dto/businessMenuCategoryCreateRequest.dto';
import { BusinessMenuCategoryUpdateRequest } from './dto/businessMenuCategoryUpdateRequest.dto';
import { BusinessMenuCategoryGetListResponse } from './dto/businessMenuCategoryGetListResponse.dto';
import { BusinessSalesChannelMenuCategoryBatchTotalActiveChannelByMenuCategoryId } from './businessSalesChannelMenuCategory.batchTotalActiveChannelByMenuCategoryId';
import { BusinessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader } from './businessSalesChannelMenuCategory.batchByBusinessMenuCategoryId.loader';

@Resolver(BusinessMenuCategory)
export class BusinessMenuCategoryResolver {
  constructor(
    private readonly createUseCase: BusinessMenuCategoryCreateUseCase,
    private readonly updateUseCase: BusinessMenuCategoryUpdateUseCase,
    private readonly deleteUseCase: BusinessMenuCategoryDeleteUseCase,
    private readonly getListUseCase: BusinessMenuCategoryGetListUseCase,
    private readonly getByIdUseCase: BusinessMenuCategoryGetByIdUseCase
  ) {}

  @Mutation(() => BusinessMenuCategory)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_category:create')
  async businessMenuCategoryCreate(
    @Args('input') requestDTO: BusinessMenuCategoryCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessMenuCategory> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id,
      updatedBy: user.id
    });
  }

  @Mutation(() => BusinessMenuCategory)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_category:update')
  async businessMenuCategoryUpdate(
    @Args('input') requestDTO: BusinessMenuCategoryUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessMenuCategory> {
    return this.updateUseCase.execute({ ...requestDTO, updatedBy: user.id });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_category:delete')
  async businessMenuCategoryDelete(
    @Args('id') id: string,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<boolean> {
    return this.deleteUseCase.execute(id);
  }

  @Query(() => BusinessMenuCategory)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_category:read')
  async businessMenuCategoryById(
    @Args('id') id: string
  ): Promise<BusinessMenuCategory> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => BusinessMenuCategoryGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_category:read')
  async businessMenuCategoryList(
    @Args() requestDTO: BusinessMenuCategoryGetListRequest
  ): Promise<BusinessMenuCategoryGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  // FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() BusinessMenuCategory: BusinessMenuCategory,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<String, Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        BusinessMenuCategory.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async creator(
    @Parent() businessMenuCategory: BusinessMenuCategory,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessMenuCategory.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessMenuCategory.createdBy
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
    @Parent() businessMenuCategory: BusinessMenuCategory,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessMenuCategory.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessMenuCategory.updatedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => [BusinessSalesChannelMenuCategory])
  async businessSalesChannelMenuCategories(
    @Parent() businessMenuCategory: BusinessMenuCategory,
    @Loader(
      BusinessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader.name
    )
    businessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader: DataLoader<
      string,
      BusinessSalesChannelMenuCategory[]
    >
  ): Promise<BusinessSalesChannelMenuCategory[]> {
    try {
      const response = await businessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader.load(
        businessMenuCategory.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => Number)
  async totalActiveChannel(
    @Parent() businessMenuCategory: BusinessMenuCategory,
    @Loader(
      BusinessSalesChannelMenuCategoryBatchTotalActiveChannelByMenuCategoryId.name
    )
    businessMenuItemCategoryItemBatchByMenuCategoryIdLoader: DataLoader<
      string,
      Number
    >
  ): Promise<Number> {
    try {
      return await businessMenuItemCategoryItemBatchByMenuCategoryIdLoader.load(
        businessMenuCategory.id
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
