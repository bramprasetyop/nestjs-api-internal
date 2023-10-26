import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  AppVersionForceUpdateType,
  AppVersionPlatform,
  AppVersionForceUpdateMethod,
  AppVersionsModel
} from '@wahyoo/wahyoo-shared';

registerEnumType(AppVersionForceUpdateMethod, {
  name: 'AppVersionForceUpdateMethod',
  description: 'AppVersionForceUpdateMethod'
});

registerEnumType(AppVersionForceUpdateType, {
  name: 'AppVersionForceUpdateType',
  description: 'AppVersionForceUpdateType'
});

registerEnumType(AppVersionPlatform, {
  name: 'AppVersionPlatform',
  description: 'AppVersionPlatform'
});

@ObjectType()
export class AppVersion {
  constructor(model: AppVersionsModel) {
    this.id = model.id;
    this.appName = model.appName;
    this.platform = model.platform;
    this.latestVersion = model.latestVersion;
    this.forceUpdateMethod = model.forceUpdateMethod;
    this.enableForceUpdate = model.enableForceUpdate;
    this.forceUpdateType = model.forceUpdateType;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }

  @Field(type => ID)
  id: string;

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
