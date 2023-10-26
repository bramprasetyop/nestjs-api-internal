import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { XHubsterStore } from './dto/xHubsterStore';
import { XHubsterStoreGetUnassignedListUseCase } from './useCases/xHubsterStore.getUnassignedList.usecase';
import { XHubsterStoreAssignBusinessOutletRequest } from './dto/xHubsterStoreAssignBusinessOutletRequest.dto';
import { XHubsterStoreAssignBusinessOutletUseCase } from './useCases/xHubsterStore.assignBusinessOutlet.usecase';
import { XHubsterItemGetUnassignedListUseCase } from './useCases/xHubsterItem.getUnassignedList.usecase';
import { XHubsterItem } from './dto/xHubsterItem';
import { XHubsterItemAssignBusinessMenuItemUseCase } from './useCases/xHubsterItem.assignBusinessMenuItem.usecase';
import { XHubsterItemAssignBusinessMenuItemRequest } from './dto/xHubsterItemAssignBusinessMenuItemRequest.dto';
import { XHubsterItemGetUnassignListRequest } from './dto/xHubsterItemGetUnassignListRequest.dto';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { Business } from '../business/dto/business.dto';

@Resolver(XHubsterItem)
export class XHubsterItemResolver {
  constructor(
    private readonly xHubsterItemGetUnassignedListUseCase: XHubsterItemGetUnassignedListUseCase,
    private readonly xHubsterItemAssignBusinessMenuItemUseCase: XHubsterItemAssignBusinessMenuItemUseCase
  ) {}

  @Mutation(() => [XHubsterItem])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('x_hubster_item_mapping:update')
  async xHubsterItemAssignBusinessMenuItem(
    @Args({
      name: 'input',
      type: () => [XHubsterItemAssignBusinessMenuItemRequest]
    })
    requestDTO: XHubsterItemAssignBusinessMenuItemRequest[]
  ): Promise<XHubsterItem[]> {
    return this.xHubsterItemAssignBusinessMenuItemUseCase.execute(requestDTO);
  }

  @Query(() => [XHubsterItem])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('x_hubster_item_mapping:read')
  async xHubsterItemUnassignedList(
    @Args() requestDTO: XHubsterItemGetUnassignListRequest
  ): Promise<XHubsterItem[]> {
    return this.xHubsterItemGetUnassignedListUseCase.execute(requestDTO);
  }

  // RESOLVER FIELD
  @ResolveField(() => Business)
  async business(
    @Parent() xHubsterItem: XHubsterItem,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      if (!xHubsterItem.businessId) return null;
      const response = await businessSingleByIdLoader.load(
        xHubsterItem.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
