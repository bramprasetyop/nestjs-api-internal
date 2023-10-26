import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessMenuModifierItemUpdateRequest } from './businessMenuModifierItemUpdateRequest.dto';

@InputType()
export class BusinessMenuModifierUpdateRequest {
  @Field(type => ID)
  id: string;

  @Field(type => ID, { nullable: true })
  createdBy: string;

  @Field(type => ID, { nullable: true })
  updatedBy: string;

  @Field(type => ID)
  businessId: string;

  @Field()
  @MaxLength(100)
  name: string;

  @Field(() => String)
  description: string;

  @Field(type => Number)
  sequence: number;

  @Field(() => [BusinessMenuModifierItemUpdateRequest])
  businessMenuModifierItems: BusinessMenuModifierItemUpdateRequest[];
}
