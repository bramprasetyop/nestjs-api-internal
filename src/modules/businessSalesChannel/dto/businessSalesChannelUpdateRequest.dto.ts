import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessSalesChannelPaymentTypeUpdateRequest } from './businessSalesChannelPaymentTypeUpdateRequest.dto';

@InputType()
export class BusinessSalesChannelUpdateRequest {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field(type => String)
  sequence: number;

  @Field(type => [BusinessSalesChannelPaymentTypeUpdateRequest])
  businessSalesChannelPaymentTypes: BusinessSalesChannelPaymentTypeUpdateRequest[];
}
