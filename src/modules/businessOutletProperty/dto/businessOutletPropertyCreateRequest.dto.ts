import { Field, ID, Int, InputType } from '@nestjs/graphql';
import { BusinessOutletPropertyIntegrationStatus } from '@wahyoo/wahyoo-shared';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  ValidateIf
} from 'class-validator';

@InputType()
export class BusinessOutletPropertyCreateRequest {
  @Field(type => ID)
  businessOutletId: string;

  @Field(type => ID, { nullable: true })
  dailyTransferOrganizationUserId?: string;

  @Field({ nullable: true })
  tkbRegion?: string;

  @Field({ nullable: true })
  picName?: string;

  @Field({ nullable: true })
  picPhoneNumber?: string;

  @Field({ nullable: true })
  xGobizEmail?: string;

  @Field({ nullable: true })
  xGobizPhoneNumber?: string;

  @Field({ nullable: true })
  xGrabFoodId?: string;

  @Field({ nullable: true })
  xGrabFoodCashierLogin?: string;

  @Field({ nullable: true })
  xGrabFoodOutletName?: string;

  @Field({ nullable: true })
  xGrabFoodUsername?: string;

  @Field({ nullable: true })
  @IsEmail()
  @ValidateIf(e => e.xGrabFoodEmail !== '')
  @IsOptional()
  xGrabFoodEmail?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('ID')
  @ValidateIf(e => e.xGrabFoodPhoneNumber !== '')
  @IsOptional()
  xGrabFoodPhoneNumber?: string;

  @Field({ nullable: true })
  xGrabFoodUrl?: string;

  @Field({ nullable: true })
  xGoFoodId?: string;

  @Field({ nullable: true })
  xGoFoodOutletName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @ValidateIf(e => e.xGoFoodEmail !== '')
  @IsOptional()
  xGoFoodEmail?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('ID')
  @ValidateIf(e => e.xGoFoodPhoneNumber !== '')
  @IsOptional()
  xGoFoodPhoneNumber?: string;

  @Field({ nullable: true })
  xGoFoodUrl?: string;

  @Field({ nullable: true })
  xShopeeFoodId?: string;

  @Field({ nullable: true })
  xShopeeFoodOutletName?: string;

  @Field({ nullable: true })
  xShopeeFoodUsername?: string;

  @Field({ nullable: true })
  xShopeeFoodPassword?: string;

  @Field({ nullable: true })
  xShopeeFoodStoreId?: string;

  @Field({ nullable: true })
  xShopeeFoodUserId?: string;

  @Field({ nullable: true })
  @IsEmail()
  @ValidateIf(e => e.xShopeeFoodEmail !== '')
  @IsOptional()
  xShopeeFoodEmail?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('ID')
  @ValidateIf(e => e.xShopeeFoodPhoneNumber !== '')
  @IsOptional()
  xShopeeFoodPhoneNumber?: string;

  @Field({ nullable: true })
  xShopeeFoodUrl?: string;

  @Field({ nullable: true })
  xTravelokaId?: string;

  @Field({ nullable: true })
  xTravelokaOutletName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @ValidateIf(e => e.xTravelokaEmail !== '')
  @IsOptional()
  xTravelokaEmail?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('ID')
  @ValidateIf(e => e.xTravelokaPhoneNumber !== '')
  @IsOptional()
  xTravelokaPhoneNumber?: string;

  @Field({ nullable: true })
  xTravelokaUrl?: string;

  @Field({ nullable: true })
  xAirAsiaId?: string;

  @Field({ nullable: true })
  xAirAsiaOutletName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @ValidateIf(e => e.xAirAsiaEmail !== '')
  @IsOptional()
  xAirAsiaEmail?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('ID')
  @ValidateIf(e => e.xAirAsiaPhoneNumber !== '')
  @IsOptional()
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
}
