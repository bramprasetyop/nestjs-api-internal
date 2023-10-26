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

export enum BusinessOutletLeadApprovalStage {
  location,
  interview,
  survey
}

registerEnumType(BusinessOutletLeadApprovalStage, {
  name: 'BusinessOutletLeadApprovalStage',
  description: 'BusinessOutletLeadApprovalStage'
});

export enum BusinessOutletLeadApprovalStatus {
  approved,
  rejected
}

registerEnumType(BusinessOutletLeadApprovalStatus, {
  name: 'BusinessOutletLeadApprovalStatus',
  description: 'BusinessOutletLeadApprovalStatus'
});

@InputType()
export class BusinessOutletLeadApprovalLocationRequest {
  @Field(type => ID)
  businessOutletLeadId: string;

  @Field(type => BusinessOutletLeadApprovalStatus)
  status: BusinessOutletLeadApprovalStatus;

  @Field(type => String)
  notes: string;
}
