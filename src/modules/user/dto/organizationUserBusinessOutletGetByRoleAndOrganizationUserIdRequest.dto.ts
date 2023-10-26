import { ArgsType, Field, ID } from '@nestjs/graphql';
import { OrganizationUserRole } from 'src/modules/auth/auth.constants';

@ArgsType()
export class OrganizationUserBusinessOutletGetByRoleAndOrganizationUserIdRequest {
  @Field(() => String)
  role: string;

  @Field(() => ID)
  organizationUserId: string;
}
