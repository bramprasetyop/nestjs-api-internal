import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessMenuModifierItemCreateRequest } from './businessMenuModifierItemCreateRequest.dto';

@InputType()
export class BusinessMenuModifierCreateRequest {
  @Field(() => ID)
  businessId: string;

  @Field(type => ID, { nullable: true })
  createdBy: string;

  @Field(type => ID, { nullable: true })
  updatedBy: string;

  @Field()
  @MaxLength(100)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  sequence: number;

  @Field(() => [BusinessMenuModifierItemCreateRequest])
  businessMenuModifierItems: BusinessMenuModifierItemCreateRequest[];
}
