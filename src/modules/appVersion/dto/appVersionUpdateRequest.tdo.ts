import { Field, ID, InputType } from '@nestjs/graphql';
import {
  AppVersionForceUpdateType,
  AppVersionPlatform,
  AppVersionForceUpdateMethod,
  AppVersionsModel
} from '@wahyoo/wahyoo-shared';

@InputType()
export class AppVersionUpdateRequest {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  appName?: string;

  @Field(type => AppVersionPlatform, { nullable: true })
  platform?: AppVersionPlatform;

  @Field({ nullable: true })
  latestVersion?: string;

  @Field(type => AppVersionForceUpdateMethod, { nullable: true })
  forceUpdateMethod?: AppVersionForceUpdateMethod;

  @Field({ nullable: true })
  enableForceUpdate?: boolean;

  @Field(type => AppVersionForceUpdateType, { nullable: true })
  forceUpdateType?: AppVersionForceUpdateType;
}
