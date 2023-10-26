import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@ArgsType()
export class BusinessSyncLogStatusRequest {
  @Field(type => ID)
  businessId: string;

  @Field(type => ID, {
    nullable: true,
    description: 'lastBusinessSyncLogId for first time sync can set null'
  })
  lastBusinessSyncLogId?: string;
}
