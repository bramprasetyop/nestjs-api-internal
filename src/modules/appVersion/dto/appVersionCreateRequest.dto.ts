import { Field, ID, InputType } from '@nestjs/graphql';
import {
  AppVersionForceUpdateType,
  AppVersionPlatform,
  AppVersionForceUpdateMethod,
  AppVersionsModel
} from '@wahyoo/wahyoo-shared';

@InputType()
export class AppVersionCreateRequest {
  @Field()
  appName: string;

  @Field(type => AppVersionPlatform)
  platform: AppVersionPlatform;

  @Field()
  latestVersion: string;

  @Field(type => AppVersionForceUpdateMethod)
  forceUpdateMethod: AppVersionForceUpdateMethod;

  @Field()
  enableForceUpdate: boolean;

  @Field(type => AppVersionForceUpdateType)
  forceUpdateType: AppVersionForceUpdateType;
}
