import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BusinessOutletPropertyModel,
  BusinessOutletPropertyIntegrationStatus
} from '@wahyoo/wahyoo-shared';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';

registerEnumType(BusinessOutletPropertyIntegrationStatus, {
  name: 'BusinessOutletPropertyIntegrationStatus',
  description: 'BusinessOutletPropertyIntegrationStatus'
});

@ObjectType()
export class BusinessOutletProperty {
  constructor(model: BusinessOutletPropertyModel) {
    this.id = model.id;
    this.businessOutletId = model.businessOutletId;
    this.businessOutlet = model.businessOutlet
      ? BusinessOutletMapper.modelToDTO(model.businessOutlet)
      : null;
    this.dailyTransferOrganizationUserId =
      model.dailyTransferOrganizationUserId;
    this.dailyTransferOrganizationUser = model.dailyTransferOrganizationUser
      ? UserMapper.modelToDTO(model.dailyTransferOrganizationUser)
      : null;
    this.xGobizEmail = model.xGobizEmail;
    this.xGobizPhoneNumber = model.xGobizPhoneNumber;
    this.xGrabFoodId = model.xGrabFoodId;
    this.xGrabFoodOutletName = model.xGrabFoodOutletName;
    this.xGrabFoodCashierLogin = model.xGrabFoodCashierLogin;
    this.xGrabFoodUsername = model.xGrabFoodUsername;
    this.xGrabFoodEmail = model.xGrabFoodEmail;
    this.xGrabFoodPhoneNumber = model.xGrabFoodPhoneNumber;
    this.xGrabFoodUrl = model.xGrabFoodUrl;
    this.xGoFoodId = model.xGoFoodId;
    this.xGoFoodOutletName = model.xGoFoodOutletName;
    this.xGoFoodEmail = model.xGoFoodEmail;
    this.xGoFoodPhoneNumber = model.xGoFoodPhoneNumber;
    this.xGoFoodUrl = model.xGoFoodUrl;
    this.xShopeeFoodId = model.xShopeeFoodId;
    this.xShopeeFoodOutletName = model.xShopeeFoodOutletName;
    this.xShopeeFoodUsername = model.xShopeeFoodUsername;
    this.xShopeeFoodPassword = model.xShopeeFoodPassword;
    this.xShopeeFoodStoreId = model.xShopeeFoodStoreId;
    this.xShopeeFoodUserId = model.xShopeeFoodUserId;
    this.xShopeeFoodEmail = model.xShopeeFoodEmail;
    this.xShopeeFoodPhoneNumber = model.xShopeeFoodPhoneNumber;
    this.xShopeeFoodUrl = model.xShopeeFoodUrl;
    this.xTravelokaId = model.xTravelokaId;
    this.xTravelokaOutletName = model.xTravelokaOutletName;
    this.xTravelokaEmail = model.xTravelokaEmail;
    this.xTravelokaPhoneNumber = model.xTravelokaPhoneNumber;
    this.xTravelokaUrl = model.xTravelokaUrl;
    this.xAirAsiaId = model.xAirAsiaId;
    this.xAirAsiaOutletName = model.xAirAsiaOutletName;
    this.xAirAsiaEmail = model.xAirAsiaEmail;
    this.xAirAsiaPhoneNumber = model.xAirAsiaPhoneNumber;
    this.xAirAsiaUrl = model.xAirAsiaUrl;
    this.xShopeeFoodStatus = model.xShopeeFoodStatus;
    this.xGrabFoodStatus = model.xGrabFoodStatus;
    this.xGoFoodStatus = model.xGoFoodStatus;
    this.xTravelokaStatus = model.xTravelokaStatus;
    this.xAirAsiaStatus = model.xAirAsiaStatus;
    this.xShopeeFoodHubsterIntegration = model.xShopeeFoodHubsterIntegration;
    this.xGrabFoodHubsterIntegration = model.xGrabFoodHubsterIntegration;
    this.xGoFoodHubsterIntegration = model.xGoFoodHubsterIntegration;
    this.xTravelokaHubsterIntegration = model.xTravelokaHubsterIntegration;
    this.xAirAsiaHubsterIntegration = model.xAirAsiaHubsterIntegration;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  businessOutletId?: string;
  @Field(type => BusinessOutlet, { nullable: true })
  businessOutlet: BusinessOutlet;

  dailyTransferOrganizationUserId?: string;
  @Field(type => OrganizationUser, { nullable: true })
  dailyTransferOrganizationUser: OrganizationUser;

  @Field({ nullable: true })
  xGobizEmail?: string;

  @Field({ nullable: true })
  xGobizPhoneNumber?: string;

  @Field({ nullable: true })
  xGrabFoodId?: string;

  @Field({ nullable: true })
  xGrabFoodOutletName?: string;

  @Field({ nullable: true })
  xGrabFoodUsername?: string;

  @Field({ nullable: true })
  xGrabFoodCashierLogin?: string;

  @Field({ nullable: true })
  xGrabFoodEmail?: string;

  @Field({ nullable: true })
  xGrabFoodPhoneNumber?: string;

  @Field({ nullable: true })
  xGrabFoodUrl?: string;

  @Field({ nullable: true })
  xGoFoodId?: string;

  @Field({ nullable: true })
  xGoFoodOutletName?: string;

  @Field({ nullable: true })
  xGoFoodEmail?: string;

  @Field({ nullable: true })
  xGoFoodPhoneNumber?: string;

  @Field({ nullable: true })
  xGoFoodUrl?: string;

  @Field({ nullable: true })
  xShopeeFoodId?: string;

  @Field({ nullable: true })
  xShopeeFoodStoreId?: string;

  @Field({ nullable: true })
  xShopeeFoodUserId?: string;

  @Field({ nullable: true })
  xShopeeFoodOutletName?: string;

  @Field({ nullable: true })
  xShopeeFoodUsername?: string;

  @Field({ nullable: true })
  xShopeeFoodPassword?: string;

  @Field({ nullable: true })
  xShopeeFoodEmail?: string;

  @Field({ nullable: true })
  xShopeeFoodPhoneNumber?: string;

  @Field({ nullable: true })
  xShopeeFoodUrl?: string;

  @Field({ nullable: true })
  xTravelokaId?: string;

  @Field({ nullable: true })
  xTravelokaOutletName?: string;

  @Field({ nullable: true })
  xTravelokaEmail?: string;

  @Field({ nullable: true })
  xTravelokaPhoneNumber?: string;

  @Field({ nullable: true })
  xTravelokaUrl?: string;

  @Field({ nullable: true })
  xAirAsiaId?: string;

  @Field({ nullable: true })
  xAirAsiaOutletName?: string;

  @Field({ nullable: true })
  xAirAsiaEmail?: string;

  @Field({ nullable: true })
  xAirAsiaPhoneNumber?: string;

  @Field({ nullable: true })
  xAirAsiaUrl?: string;

  @Field(() => BusinessOutletPropertyIntegrationStatus, { nullable: true })
  xShopeeFoodStatus?: BusinessOutletPropertyIntegrationStatus;

  @Field(() => BusinessOutletPropertyIntegrationStatus, { nullable: true })
  xGrabFoodStatus?: BusinessOutletPropertyIntegrationStatus;

  @Field(() => BusinessOutletPropertyIntegrationStatus, { nullable: true })
  xGoFoodStatus?: BusinessOutletPropertyIntegrationStatus;

  @Field(() => BusinessOutletPropertyIntegrationStatus, { nullable: true })
  xTravelokaStatus?: BusinessOutletPropertyIntegrationStatus;

  @Field(() => BusinessOutletPropertyIntegrationStatus, { nullable: true })
  xAirAsiaStatus?: BusinessOutletPropertyIntegrationStatus;

  @Field({ nullable: true })
  xShopeeFoodHubsterIntegration?: boolean;

  @Field({ nullable: true })
  xGrabFoodHubsterIntegration?: boolean;

  @Field({ nullable: true })
  xGoFoodHubsterIntegration?: boolean;

  @Field({ nullable: true })
  xTravelokaHubsterIntegration?: boolean;

  @Field({ nullable: true })
  xAirAsiaHubsterIntegration?: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
