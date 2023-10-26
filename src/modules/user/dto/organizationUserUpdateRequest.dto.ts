import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { OrganizationUserStatus } from '@wahyoo/wahyoo-shared';

@InputType()
export class OrganizationUserUpdateRequest {
  @Field(() => ID)
  id: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  countryCode: string;

  @Field(() => OrganizationUserStatus)
  status: OrganizationUserStatus;

  @Field()
  isConnectToWahyooUser: boolean;

  @Field(() => ID, { nullable: true })
  updatedBy: string;

  newUserId: string;

  xOrganizationUserWahyooUserExists: boolean;
}
