import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class BusinessSalesChannelPaymentTypeUpdateRequest {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => ID)
  businessPaymentTypeId: string;

  @Field(type => ID)
  businessSalesChannelId: string;
}
