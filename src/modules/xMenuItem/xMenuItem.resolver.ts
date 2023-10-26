import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { XMenuItemGetUnassignedListUseCase } from './useCases/xMenuItem.getUnassignedList.usecase';
import { XMenuItem } from './dto/xMenuItem.dto';
import { XMenuItemGetUnassignListRequest } from './dto/xMenuItemUnassignedListRequest.dto';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { Business } from '../business/dto/business.dto';
import { BusinessMenuItem } from '../businessMenuItem/dto/businessMenuItem.dto';
import { BusinessMenuItemSingleByIdLoader } from '../businessMenuItem/businessMenuItem.singleById.loader';
import { XMenuItemAssignBusinessMenuItemRequest } from './dto/xMenuItemAssignBusinessMenuItemRequest.dto';
import { XMenuItemAssignBusinessMenuItemUseCase } from './useCases/xMenuItem.assignBusinessMenuItem.usecase';

@Resolver(XMenuItem)
export class XMenuItemResolver {
  constructor(
    private readonly xMenuItemGetUnassignedListUseCase: XMenuItemGetUnassignedListUseCase,
    private readonly xMenuItemAssignBusinessMenuItemUseCase: XMenuItemAssignBusinessMenuItemUseCase
  ) {}

  @Query(() => [XMenuItem])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('x_item_mapping:read')
  async xMenuItemUnassignedList(
    @Args() requestDTO: XMenuItemGetUnassignListRequest
  ): Promise<XMenuItem[]> {
    return this.xMenuItemGetUnassignedListUseCase.execute(requestDTO);
  }

  @Mutation(() => [XMenuItem])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('x_item_mapping:update')
  async xMenuItemAssignBusinessMenuItem(
    @Args({
      name: 'input',
      type: () => [XMenuItemAssignBusinessMenuItemRequest]
    })
    requestDTO: XMenuItemAssignBusinessMenuItemRequest[]
  ): Promise<XMenuItem[]> {
    return this.xMenuItemAssignBusinessMenuItemUseCase.execute(requestDTO);
  }

  // RESOLVER FIELD
  @ResolveField(() => Business)
  async business(
    @Parent() xMenuItem: XMenuItem,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      if (!xMenuItem.businessId) return null;
      const response = await businessSingleByIdLoader.load(
        xMenuItem.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => BusinessMenuItem)
  async businessMenuItem(
    @Parent() xMenuItem: XMenuItem,
    @Loader(BusinessMenuItemSingleByIdLoader.name)
    businessMenuItemSingleByIdLoader: DataLoader<string, BusinessMenuItem>
  ): Promise<BusinessMenuItem> {
    try {
      if (!xMenuItem.businessMenuItemId) return null;
      const response = await businessMenuItemSingleByIdLoader.load(
        xMenuItem.businessMenuItemId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
