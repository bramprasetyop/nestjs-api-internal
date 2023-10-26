import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver,
  Info
} from '@nestjs/graphql';
import { BusinessMenuItemCreateRequest } from './dto/businessMenuItemCreateRequest.dto';
import { BusinessMenuItemGetListRequest } from './dto/businessMenuItemGetListRequest.dto';
import { BusinessMenuItemCreateUseCase } from './useCases/businessMenuItem.create.usecase';
import { BusinessMenuItem } from './dto/businessMenuItem.dto';
import { BusinessMenuItemGetListUseCase } from './useCases/businessMenuItem.getList.usecase';
import { BusinessMenuItemGetByIdUseCase } from './useCases/businessMenuItem.getById.usecase';
import { BusinessMenuItemGetListResponse } from './dto/businessMenuItemGetListResponse.dto';
import { Loader } from 'src/commons/loader';
import DataLoader = require('dataloader');
import { BusinessMenuItemUpdateRequest } from './dto/businessMenuItemUpdateRequest.dto';
import { BusinessMenuItemUpdateUseCase } from './useCases/businessMenuItem.update.usecase';
import { BusinessMenuItemDeleteUseCase } from './useCases/businessMenuItem.delete.usecase';
import { BusinessMenuCategorySingleByIdLoader } from '../businessMenuCategory/businessMenuCategory.singleById.loader';
import { BusinessMenuCategory } from '../businessMenuCategory/dto/businessMenuCategory.dto';
import { BusinessMenuItemModifier } from './dto/businessMenuItemModifier.dto';
import { BusinessMenuItemModifierBatchByMenuItemIdLoader } from './businessMenuItemModifier.batchByMenuItemId.loader';
import { BusinessSalesChannelMenuItemBatchByMenuItemIdLoader } from './businessSalesChannelMenuItem.batchByMenuItemId.loader';
import { BusinessSalesChannelMenuItem } from './dto/businessSalesChannelMenuItem.dto';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { BusinessSalesChannelMenuItemBatchTotalActiveChannelByMenuItemIdLoader } from './businessSalesChannelMenuCategory.batchTotalActiveChannelByMenuItemId';
import { GraphQLUtil } from 'src/commons/graphql.util';
import { Business } from '../business/dto/business.dto';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { XHubsterItem } from '../hubster/dto/xHubsterItem';
import { XKlikitItem } from '../klikit/dto/xKlikitItem';
import { XHubsterItemBatchByBusinessMenuItemIdLoader } from '../hubster/xHubsterItem.batchByBusinessMenuItemId.loader';
import { XKlikitItemBatchByBusinessMenuItemIdLoader } from '../klikit/xKlikitItem.batchByBusinessMenuItemId.loader';

@Resolver(BusinessMenuItem)
export class BusinessMenuItemResolver {
  constructor(
    private readonly createUseCase: BusinessMenuItemCreateUseCase,
    private readonly getListUseCase: BusinessMenuItemGetListUseCase,
    private readonly getByIdUseCase: BusinessMenuItemGetByIdUseCase,
    private readonly updateUseCase: BusinessMenuItemUpdateUseCase,
    private readonly deleteUseCase: BusinessMenuItemDeleteUseCase
  ) {}

  @Mutation(() => BusinessMenuItem)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_item:create')
  async businessMenuItemCreate(
    @Args('input') requestDTO: BusinessMenuItemCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessMenuItem> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id,
      updatedBy: user.id
    });
  }

  @Mutation(() => BusinessMenuItem)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_item:update')
  async businessMenuItemUpdate(
    @Args('input') requestDTO: BusinessMenuItemUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessMenuItem> {
    return this.updateUseCase.execute({ ...requestDTO, updatedBy: user.id });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_item:delete')
  async businessMenuItemDelete(
    @Args('id') id: string,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<boolean> {
    return this.deleteUseCase.execute(id);
  }

  @Query(() => BusinessMenuItem)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_item:read')
  async businessMenuItemById(
    @Args('id') id: string
  ): Promise<BusinessMenuItem> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => BusinessMenuItemGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_menu_item:read')
  async businessMenuItemList(
    @Args() requestDTO: BusinessMenuItemGetListRequest
  ): Promise<BusinessMenuItemGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  // FIELD DATA LOADER
  @ResolveField(() => BusinessMenuCategory)
  async businessMenuCategory(
    @Parent() businessMenuItem: BusinessMenuItem,
    @Loader(BusinessMenuCategorySingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<
      BusinessMenuCategory['id'],
      BusinessMenuItem
    >
  ): Promise<BusinessMenuItem> {
    try {
      const response = await businessSingleByIdLoader.load(
        businessMenuItem.businessMenuCategoryId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() BusinessMenuItem: BusinessMenuItem,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<String, Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        BusinessMenuItem.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => [BusinessMenuItemModifier])
  async businessMenuItemModifiers(
    @Parent() businessMenuItem: BusinessMenuItem,
    @Loader(BusinessMenuItemModifierBatchByMenuItemIdLoader.name)
    businessMenuItemModifierBatchByMenuItemIdLoader: DataLoader<
      string,
      BusinessMenuItemModifier[]
    >,
    @Info() info
  ): Promise<BusinessMenuItemModifier[]> {
    try {
      const rootResolver = GraphQLUtil.getParentResolverInfo(info);
      let response = await businessMenuItemModifierBatchByMenuItemIdLoader.load(
        businessMenuItem.id
      );

      // only for resolver query syncBusiness
      if (
        rootResolver.key === 'syncBusiness' &&
        rootResolver.typename === 'Query'
      ) {
        response = response.filter(el => el.status === 'active');
      }
      // SORT BY sequence ASC
      response = response.sort((a, b) => a.sequence - b.sequence);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => [BusinessSalesChannelMenuItem])
  async businessSalesChannelMenuItems(
    @Parent() businessMenuItem: BusinessMenuItem,
    @Loader(BusinessSalesChannelMenuItemBatchByMenuItemIdLoader.name)
    businessSalesChannelMenuItemBatchByMenuItemIdLoader: DataLoader<
      BusinessMenuItem['id'],
      BusinessSalesChannelMenuItem[]
    >
  ): Promise<BusinessSalesChannelMenuItem[]> {
    try {
      const response = await businessSalesChannelMenuItemBatchByMenuItemIdLoader.load(
        businessMenuItem.id
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async creator(
    @Parent() businessMenuItem: BusinessMenuItem,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessMenuItem.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessMenuItem.createdBy
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async modifier(
    @Parent() businessMenuItem: BusinessMenuItem,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessMenuItem.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessMenuItem.updatedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => Number)
  async totalActiveChannel(
    @Parent() businessMenuItem: BusinessMenuItem,
    @Loader(
      BusinessSalesChannelMenuItemBatchTotalActiveChannelByMenuItemIdLoader.name
    )
    businessMenuItemItemItemBatchByMenuItemIdLoader: DataLoader<string, Number>
  ): Promise<Number> {
    try {
      return await businessMenuItemItemItemBatchByMenuItemIdLoader.load(
        businessMenuItem.id
      );
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => [XHubsterItem])
  async xHubsterItems(
    @Parent() businessMenuItem: BusinessMenuItem,
    @Loader(XHubsterItemBatchByBusinessMenuItemIdLoader.name)
    xHubsterItemBatchByBusinessMenuItemIdLoader: DataLoader<
      String,
      [XHubsterItem]
    >
  ): Promise<[XHubsterItem]> {
    try {
      if (businessMenuItem.id) {
        const response = await xHubsterItemBatchByBusinessMenuItemIdLoader.load(
          businessMenuItem.id
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => [XKlikitItem])
  async xKlikitItems(
    @Parent() businessMenuItem: BusinessMenuItem,
    @Loader(XKlikitItemBatchByBusinessMenuItemIdLoader.name)
    xKlikitItemBatchByBusinessMenuItemIdLoader: DataLoader<
      String,
      [XKlikitItem]
    >
  ): Promise<[XKlikitItem]> {
    try {
      if (businessMenuItem.id) {
        const response = await xKlikitItemBatchByBusinessMenuItemIdLoader.load(
          businessMenuItem.id
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
