import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { OrganizationUserDailyFeeAssignment } from './organizationUserDailyFeeAssignment.dto';
import { OrganizationUserDailyFinanceReport } from './organizationUserDailyFinanceReport.dto';

@ObjectType()
export class OrganizationUserDailyFeeAssignmentGetListResponse {
  @Field(type => [OrganizationUserDailyFeeAssignment])
  organizationUserDailyFeeAssignment: OrganizationUserDailyFeeAssignment[];

  @Field()
  meta: PaginationMeta;
}
