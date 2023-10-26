import { Field, InputType, ID, registerEnumType } from '@nestjs/graphql';
import { BusinessLeadStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';

registerEnumType(BusinessLeadStatus, {
  name: 'BusinessLeadStatus',
  description: 'Business Lead Status'
});

@InputType()
export class BusinessLeadClosedRequest {
  @Field(type => ID)
  id: string;

  status: BusinessLeadStatus;

  closedAt: Date;

  closedBy: string;
}
