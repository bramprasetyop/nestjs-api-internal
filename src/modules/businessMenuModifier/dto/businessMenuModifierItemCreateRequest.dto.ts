import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { type } from 'os';

@InputType()
export class BusinessMenuModifierItemCreateRequest {
  @Field()
  @MaxLength(100)
  name: string;

  @Field(type => Number)
  sequence: number;
}
