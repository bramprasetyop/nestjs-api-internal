import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';

@ObjectType()
export class LoginOtpResponse {
  @Field(type => String)
  token: string;

  @Field(type => Date)
  expiredAt: Date;

  @Field(type => ID)
  organizationUserId: string;

  @Field(type => OrganizationUser, { nullable: true })
  user?: OrganizationUser;
}
