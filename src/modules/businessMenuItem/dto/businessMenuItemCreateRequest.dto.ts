import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessMenuItemModifierCreateRequest } from './businessMenuItemModifierCreateRequest.dto';
import { BusinessSalesChannelMenuItemCreateRequest } from './businessSalesChannelMenuItemCreateRequest.dto';

@InputType()
export class BusinessMenuItemCreateRequest {
  @Field(type => ID)
  businessMenuCategoryId: string;

  @Field(type => ID, { nullable: true })
  createdBy?: string;

  @Field(type => ID, { nullable: true })
  updatedBy?: string;

  @Field()
  @MaxLength(150)
  name: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => String)
  description: string;

  @Field(type => Number)
  sequence: number;

  @Field(type => Number)
  priceBase: number;

  @Field(type => [ID], { nullable: true })
  xHubsterItemIds?: [string];

  @Field(type => [ID], { nullable: true })
  xKlikitItemIds?: [string];

  @Field(type => [BusinessSalesChannelMenuItemCreateRequest])
  businessSalesChannelMenuItems: BusinessSalesChannelMenuItemCreateRequest[];

  @Field(type => [BusinessMenuItemModifierCreateRequest])
  businessMenuItemModifiers: BusinessMenuItemModifierCreateRequest[];

  @Field(type => Number, { nullable: true, defaultValue: 0 })
  estimatedCogsPrice: number;

  @Field(type => Number, { nullable: true, defaultValue: 0 })
  breakevenPrice: number;

  @Field(type => Number, { nullable: true, defaultValue: 0 })
  effectivePrice: number;
}
