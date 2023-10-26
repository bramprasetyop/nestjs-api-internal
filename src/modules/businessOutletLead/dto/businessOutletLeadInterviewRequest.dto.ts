import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class BusinessOutletLeadInterviewRequest {
  @Field(type => ID)
  businessOutletLeadId: string;

  @Field({ nullable: true })
  interviewMeetUrl: string;

  @Field({ nullable: true })
  interviewSchedule: Date;
}
