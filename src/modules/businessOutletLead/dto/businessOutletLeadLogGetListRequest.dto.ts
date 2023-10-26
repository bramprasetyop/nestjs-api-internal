import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import {
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadRejectedReason,
  BusinessOutletLeadStatus
} from '@wahyoo/wahyoo-shared';
import { Pagination } from 'src/commons/pagination.dto';

@ArgsType()
export class BusinessOutletLeadLogGetListRequest extends Pagination {
  @Field(type => ID)
  businessOutletLeadId: string;
}
