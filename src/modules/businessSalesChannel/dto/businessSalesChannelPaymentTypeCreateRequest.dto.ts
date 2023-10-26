import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class BusinessSalesChannelPaymentTypeCreateRequest {
  @Field(type => ID)
  businessPaymentTypeId: string;
}
