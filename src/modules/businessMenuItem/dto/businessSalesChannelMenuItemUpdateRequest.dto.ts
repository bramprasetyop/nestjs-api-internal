import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { BusinessSalesChannelMenuItemStatus } from '@wahyoo/wahyoo-shared';

registerEnumType(BusinessSalesChannelMenuItemStatus, {
  name: 'BusinessSalesChannelMenuItemStatus',
  description: 'Business Sales Channel Menu Item Status'
});

@InputType()
export class BusinessSalesChannelMenuItemUpdateRequest {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => ID)
  businessSalesChannelId: string;

  @Field(() => Number)
  priceFinal: number;

  @Field(() => BusinessSalesChannelMenuItemStatus)
  status: BusinessSalesChannelMenuItemStatus;
}
