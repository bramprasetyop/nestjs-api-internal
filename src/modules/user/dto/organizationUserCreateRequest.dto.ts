import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { OrganizationUserStatus } from '@wahyoo/wahyoo-shared';

@InputType()
export class OrganizationUserCreateRequest {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  countryCode: string;

  @Field(() => OrganizationUserStatus)
  status?: OrganizationUserStatus;

  @Field()
  isConnectToWahyooUser: boolean;

  @Field(() => ID, { nullable: true })
  createdBy: string;

  updatedBy: string;

  xWahyooUserId: string;
}
