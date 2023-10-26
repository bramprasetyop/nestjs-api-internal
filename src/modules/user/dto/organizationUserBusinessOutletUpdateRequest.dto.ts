import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { OrganizationUserStatus } from '@wahyoo/wahyoo-shared';

@InputType()
export class OrganizationUserBusinessOutletUpdateRequest {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  organizationUserId: string;

  @Field(() => ID)
  businessOutletId: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => OrganizationUserStatus)
  status: OrganizationUserStatus;

  @Field(() => ID, { nullable: true })
  updatedBy: string;
}
