import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class BusinessSalesChannelCategoryUpdateRequest {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field(type => Number)
  sequence: number;
}
