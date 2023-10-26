import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessLead } from './businessLead.dto';

@ObjectType()
export class BusinessLeadListResponse {
  @Field(type => Int, { defaultValue: 0 })
  totalUncompleted: number;

  @Field(type => [BusinessLead])
  businessLeads: BusinessLead[];

  @Field()
  meta: PaginationMeta;
}
