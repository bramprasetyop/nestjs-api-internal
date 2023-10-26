import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { OrganizationUserBusinessStatus } from '@wahyoo/wahyoo-shared';

registerEnumType(OrganizationUserBusinessStatus, {
  name: 'OrganizationUserBusinessStatus',
  description: 'OrganizationUserBusinessStatus'
});

@InputType()
export class OrganizationUserBusinessCreateRequest {
  @Field(() => ID)
  organizationUserId: string;

  @Field(() => ID)
  businessId: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => OrganizationUserBusinessStatus)
  status: OrganizationUserBusinessStatus;

  @Field(() => ID, { nullable: true })
  createdBy: string;

  updatedBy: string;
}
