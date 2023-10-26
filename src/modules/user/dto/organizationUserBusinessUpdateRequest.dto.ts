import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { OrganizationUserBusinessStatus } from '@wahyoo/wahyoo-shared';

@InputType()
export class OrganizationUserBusinessUpdateRequest {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  organizationUserId: string;

  @Field(() => ID)
  businessId: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => OrganizationUserBusinessStatus)
  status: OrganizationUserBusinessStatus;

  @Field(() => ID, { nullable: true })
  updatedBy: string;
}
