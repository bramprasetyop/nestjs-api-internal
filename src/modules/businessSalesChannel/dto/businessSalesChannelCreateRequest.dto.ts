import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessSalesChannelPaymentTypeCreateRequest } from './businessSalesChannelPaymentTypeCreateRequest.dto';

@InputType()
export class BusinessSalesChannelCreateRequest {
  @Field(type => ID)
  businessId: string;

  @Field(type => ID)
  businessSalesChannelCategoryId: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field(type => String)
  picture: string;

  @Field(type => [BusinessSalesChannelPaymentTypeCreateRequest])
  businessSalesChannelPaymentTypes: BusinessSalesChannelPaymentTypeCreateRequest[];
}
