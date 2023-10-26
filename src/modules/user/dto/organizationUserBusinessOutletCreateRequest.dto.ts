import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { OrganizationUserBusinessOutletStatus } from '@wahyoo/wahyoo-shared';

registerEnumType(OrganizationUserBusinessOutletStatus, {
  name: 'OrganizationUserBusinessOutletStatus',
  description: 'OrganizationUserBusinessOutletStatus'
});

@InputType()
export class OrganizationUserBusinessOutletCreateRequest {
  @Field(() => ID)
  organizationUserId: string;

  @Field(() => ID)
  businessOutletId: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => OrganizationUserBusinessOutletStatus)
  status: OrganizationUserBusinessOutletStatus;

  @Field(() => ID, { nullable: true })
  createdBy: string;

  updatedBy: string;
}
