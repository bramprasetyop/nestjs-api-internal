import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessMenuItemModifierUpdateRequest } from './businessMenuItemModifierUpdateRequest.dto';
import { BusinessSalesChannelMenuItemUpdateRequest } from './businessSalesChannelMenuItemUpdateRequest.dto';

@InputType()
export class BusinessMenuItemUpdateRequest {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessMenuCategoryId: string;

  @Field(type => ID, { nullable: true })
  createdBy?: string;

  @Field(type => ID, { nullable: true })
  updatedBy?: string;

  @Field(type => ID)
  businessId: string;

  @Field()
  @MaxLength(100)
  name: string;

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

  @Field(type => [BusinessSalesChannelMenuItemUpdateRequest])
  businessSalesChannelMenuItems: BusinessSalesChannelMenuItemUpdateRequest[];

  @Field(type => [BusinessMenuItemModifierUpdateRequest])
  businessMenuItemModifiers: BusinessMenuItemModifierUpdateRequest[];

  @Field(type => Number)
  estimatedCogsPrice: number;

  @Field(type => Number)
  breakevenPrice: number;

  @Field(type => Number)
  effectivePrice: number;
}
