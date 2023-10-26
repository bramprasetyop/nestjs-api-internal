import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { type } from 'os';

@InputType()
export class BusinessMenuModifierItemUpdateRequest {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field()
  @MaxLength(100)
  name: string;

  @Field(type => Number)
  sequence: number;
}
