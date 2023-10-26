import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import {
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadRejectedReason,
  BusinessOutletLeadStatus
} from '@wahyoo/wahyoo-shared';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessOutletLeadFilter {
  @Field(type => BusinessOutletLeadStatus, { nullable: true })
  status: BusinessOutletLeadStatus;

  @Field(type => BusinessOutletLeadOngoingStatus, { nullable: true })
  ongoingStatus: BusinessOutletLeadOngoingStatus;

  @Field(type => ID, { nullable: true })
  rejectedReason: BusinessOutletLeadRejectedReason;
}

@ArgsType()
export class BusinessOutletLeadGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessOutletLeadFilter;

  @Field(type => String, { nullable: true })
  search: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => Boolean, { defaultValue: false })
  disabledPagination: boolean;
}
