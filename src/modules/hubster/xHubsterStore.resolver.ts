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
import { XHubsterStoreGetUnassignListRequest } from './dto/xHubsterStoreGetUnassignListRequest.dto';

@Resolver(XHubsterStore)
export class XHubsterStoreResolver {
  constructor(
    private readonly xHubsterStoreGetUnassignedListUseCase: XHubsterStoreGetUnassignedListUseCase,
    private readonly xHubsterStoreAssignBusinessOutletUseCase: XHubsterStoreAssignBusinessOutletUseCase
  ) {}

  @Mutation(() => [XHubsterStore])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('x_hubster_store_mapping:update')
  async xHubsterStoreAssignBusinessOutlet(
    @Args({
      name: 'input',
      type: () => [XHubsterStoreAssignBusinessOutletRequest]
    })
    requestDTO: XHubsterStoreAssignBusinessOutletRequest[]
  ): Promise<XHubsterStore[]> {
    return this.xHubsterStoreAssignBusinessOutletUseCase.execute(requestDTO);
  }

  @Query(() => [XHubsterStore])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('x_hubster_store_mapping:read')
  async xHubsterStoreUnassignedList(
    @Args() requestDTO: XHubsterStoreGetUnassignListRequest
  ): Promise<XHubsterStore[]> {
    return this.xHubsterStoreGetUnassignedListUseCase.execute(requestDTO);
  }
}
