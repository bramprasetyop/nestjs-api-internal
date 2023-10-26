import { Field, InputType, ID, registerEnumType } from '@nestjs/graphql';
import { BusinessSalesChannelMenuCategoryStatus } from '@wahyoo/wahyoo-shared';

registerEnumType(BusinessSalesChannelMenuCategoryStatus, {
  name: 'BusinessSalesChannelMenuCategoryStatus',
  description: 'Business Sales Channel Menu Category Status'
});
@InputType()
export class BusinessSalesChannelMenuCategoryCreateRequest {
  @Field(type => ID)
  businessSalesChannelId: string;

  @Field(type => BusinessSalesChannelMenuCategoryStatus)
  status: BusinessSalesChannelMenuCategoryStatus;
}
