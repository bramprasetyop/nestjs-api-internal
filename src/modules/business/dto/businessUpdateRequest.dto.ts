import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessStatus } from '@wahyoo/wahyoo-shared';

@InputType()
export class BusinessUpdateRequest {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationId: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field(type => BusinessStatus)
  status?: BusinessStatus;
}
