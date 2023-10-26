import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@ArgsType()
export class BusinessSyncRequest {
  @Field(type => ID)
  businessId?: string;
}
