import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessStatus } from '@wahyoo/wahyoo-shared';

@InputType()
export class BusinessCreateRequest {
  @Field(type => ID)
  organizationId: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field(type => BusinessStatus)
  status?: BusinessStatus;
}
