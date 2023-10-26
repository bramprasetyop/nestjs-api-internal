import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessOutletLead } from './businessOutletLead.dto';

@ObjectType()
export class BusinessOutletLeadGetListResponse {
  @Field(type => [BusinessOutletLead])
  businessOutletLeads: BusinessOutletLead[];

  @Field()
  meta: PaginationMeta;
}
