import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessOutletLead } from './businessOutletLead.dto';
import { BusinessOutletLeadLog } from './businessOutletLeadLog.dto';

@ObjectType()
export class BusinessOutletLeadLogGetListResponse {
  @Field(type => [BusinessOutletLeadLog])
  businessOutletLeadLogs: BusinessOutletLeadLog[];

  @Field()
  meta: PaginationMeta;
}
