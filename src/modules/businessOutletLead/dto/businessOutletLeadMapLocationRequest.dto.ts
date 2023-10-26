import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import {
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadRejectedReason,
  BusinessOutletLeadStatus
} from '@wahyoo/wahyoo-shared';
import { Pagination } from 'src/commons/pagination.dto';

@ArgsType()
export class BusinessOutletAndLeadMapLocationRequest {
  @Field({ nullable: true })
  lat: number;

  @Field({ nullable: true })
  lng: number;

  @Field(type => ID)
  businessId: string;

  @Field(type => Boolean, { defaultValue: false })
  disabledPagination: boolean;
}
