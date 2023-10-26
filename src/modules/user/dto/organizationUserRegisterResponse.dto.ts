import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationUser } from './user.dto';

@ObjectType()
export class OrganizationUserRegisterResponse {
  @Field(type => String)
  token: string;

  @Field(type => Date)
  expiredAt: Date;

  @Field(type => ID)
  organizationUserId: string;

  @Field(type => OrganizationUser, { nullable: true })
  user?: OrganizationUser;
}
