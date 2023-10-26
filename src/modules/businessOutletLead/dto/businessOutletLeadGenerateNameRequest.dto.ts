import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class BusinessOutletLeadGenerateNameRequest {
  @Field(type => ID)
  businessId: string;

  @Field(type => ID)
  villageId: string;
}
