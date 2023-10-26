import {
  ArgsType,
  Field,
  InputType,
  ID,
  registerEnumType
} from '@nestjs/graphql';
import {
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadRejectedReason,
  BusinessOutletLeadStatus
} from '@wahyoo/wahyoo-shared';

@InputType()
export class BusinessOutletLeadTrainingRequest {
  @Field(type => ID)
  businessOutletLeadId: string;

  @Field()
  trainingSchedule: Date;
}
