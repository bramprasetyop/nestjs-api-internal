import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { ScheduledNotification } from './dto/scheduledNotification.dto';
import { ScheduledNotificationGetListResponse } from './dto/scheduledNotificationGetListResponse.dto';
import { ScheduledNotificationGetByIdUseCase } from './useCases/scheduledNotification.getById.usecase';
import { ScheduledNotificationGetListUseCase } from './useCases/scheduledNotification.getList.usecase';
import { ScheduledNotificationListRequest } from './dto/scheduledNotificationListRequest.dto';
import { ScheduledNotificationUpdateUseCase } from './useCases/scheduledNotification.update.usecase';
import { ScheduledNotificationCancelUseCase } from './useCases/scheduledNotification.cancel.usecase';
import { ScheduledNotificationUpdateRequest } from './dto/scheduledNotificationUpdateRequest.dto';
import { OrganizationUser } from '../user/dto/user.dto';
import { Loader } from 'src/commons/loader';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import DataLoader from 'dataloader';

@Resolver(ScheduledNotification)
export class ScheduledNotificationResolver {
  constructor(
    private readonly getByIdUseCase: ScheduledNotificationGetByIdUseCase,
    private readonly getListUseCase: ScheduledNotificationGetListUseCase,
    private readonly updateUseCase: ScheduledNotificationUpdateUseCase,
    private readonly cancelUseCase: ScheduledNotificationCancelUseCase
  ) {}

  @Query(() => ScheduledNotificationGetListResponse)
  @UseGuards(GqlAuthGuard)
  async scheduledNotificationList(
    @Args() requestDTO: ScheduledNotificationListRequest
  ): Promise<ScheduledNotificationGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  @Query(() => ScheduledNotification)
  @UseGuards(GqlAuthGuard)
  async scheduledNotificationById(
    @Args('id') id: string
  ): Promise<ScheduledNotification> {
    return this.getByIdUseCase.execute(id);
  }

  @Mutation(() => ScheduledNotification)
  @UseGuards(GqlAuthGuard)
  async scheduledNotificationUpdate(
    @Args('input') requestDTO: ScheduledNotificationUpdateRequest
  ): Promise<ScheduledNotification> {
    return this.updateUseCase.execute(requestDTO);
  }

  @Mutation(() => ScheduledNotification)
  @UseGuards(GqlAuthGuard)
  async scheduledNotificationCancel(
    @Args('id') id: string
  ): Promise<ScheduledNotification> {
    return this.cancelUseCase.execute(id);
  }

  @ResolveField(() => OrganizationUser)
  async createdByUser(
    @Parent() ScheduledNotification: ScheduledNotification,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (ScheduledNotification.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          ScheduledNotification.createdBy
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
    @Parent() ScheduledNotification: ScheduledNotification,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (ScheduledNotification.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          ScheduledNotification.updatedBy
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
