import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { GetAllNotificationListRequest } from './dto/getAllNotificationListRequest.dto';
import { GetAllNotificationListResponse } from './dto/getAllNotificationListResponse.dto';
import { ReadNotificationRequest } from './dto/readNotificationRequest.dto';
import { RegisterDeviceNotificationRequest } from './dto/registerDeviceNotificationRequest.dto';
import { SendNotificationRequest } from './dto/sendNotificationRequest.dto';
import { UnregisterDeviceNotificationRequest } from './dto/unregisterDeviceNotificationRequest.dto';
import { UserNotificationListRequest } from './dto/userNotificationListRequest.dto';
import { UserNotificationListResponse } from './dto/userNotificationListResponse.dto';
import { UserNotificationGetAllNotificationListUseCase } from './useCases/userNotification.getAllNotificationList.usecase';
import { UserNotificationReadAllNotificationUseCase } from './useCases/userNotification.readAllNotification.usecase';
import { UserNotificationReadNotificationUseCase } from './useCases/userNotification.readNotification.usecase';
import { UserNotificationRegisterDeviceNotificationUseCase } from './useCases/userNotification.registerDeviceNotification.usecase';
import { UserNotificationSendNotificationUseCase } from './useCases/userNotification.sendNotification.usecase';
import { UserNotificationUnregisterDeviceNotificationUseCase } from './useCases/userNotification.unregisterDeviceNotification.usecase';
import { UserNotificationUserNotificationListUseCase } from './useCases/userNotification.userNotificationList.usecase';

@Resolver()
export class UserNotificationResolver {
  constructor(
    private readonly userNotificationUserNotificationListUseCase: UserNotificationUserNotificationListUseCase,
    private readonly userNotificationReadNotificationUseCase: UserNotificationReadNotificationUseCase,
    private readonly userNotificationReadAllNotificationUseCase: UserNotificationReadAllNotificationUseCase,
    private readonly userNotificationRegisterDeviceNotificationUseCase: UserNotificationRegisterDeviceNotificationUseCase,
    private readonly userNotificationUnregisterDeviceNotificationUseCase: UserNotificationUnregisterDeviceNotificationUseCase,
    private readonly userNotificationSendNotificationUseCase: UserNotificationSendNotificationUseCase,
    private readonly userNotificationGetAllNotificationListUseCase: UserNotificationGetAllNotificationListUseCase
  ) {}

  @Query(() => UserNotificationListResponse)
  @UseGuards(GqlAuthGuard)
  async userNotificationList(
    @Args() requestDTO: UserNotificationListRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<UserNotificationListResponse> {
    return this.userNotificationUserNotificationListUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async userNotificationRead(
    @Args() requestDTO: ReadNotificationRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<Boolean> {
    return this.userNotificationReadNotificationUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async userNotificationReadAll(
    @CurrentUser() currentUser: ICurrentUserArgs,
    @Args('appId', { nullable: true }) appId: string
  ): Promise<Boolean> {
    return this.userNotificationReadAllNotificationUseCase
      .with(currentUser)
      .execute(appId);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async userNotificationRegisterDevice(
    @Args('input') requestDTO: RegisterDeviceNotificationRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<Boolean> {
    return this.userNotificationRegisterDeviceNotificationUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async userNotificationUnregisterDevice(
    @Args('input') requestDTO: UnregisterDeviceNotificationRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<Boolean> {
    return this.userNotificationUnregisterDeviceNotificationUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @Permissions('user_notification:create')
  async userNotificationSend(
    @Args('input') requestDTO: SendNotificationRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<Boolean> {
    return this.userNotificationSendNotificationUseCase.execute({
      ...requestDTO,
      createdBy: currentUser.id
    });
  }

  @Query(() => GetAllNotificationListResponse)
  @UseGuards(GqlAuthGuard)
  @Permissions('user_notification:read')
  async userNotificationGetAll(
    @Args() requestDTO: GetAllNotificationListRequest
  ): Promise<GetAllNotificationListResponse> {
    return this.userNotificationGetAllNotificationListUseCase.execute(
      requestDTO
    );
  }
}
