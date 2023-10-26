import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { OrganizationStatus } from '@wahyoo/wahyoo-shared';

@InputType()
export class OrganizationCreateRequest {
  @Field()
  @MaxLength(30)
  name: string;

  @Field(type => OrganizationStatus)
  status?: OrganizationStatus;
}
