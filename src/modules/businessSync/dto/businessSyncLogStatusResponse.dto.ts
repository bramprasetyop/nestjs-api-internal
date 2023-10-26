import { Field, ObjectType } from '@nestjs/graphql';
import { BusinessSyncLog } from './businessSyncLog.dto';

@ObjectType()
export class BusinessSyncLogStatusResponse {
  @Field(type => Boolean)
  shouldSync: boolean;

  @Field(type => BusinessSyncLog, { nullable: true })
  lastBusinessSyncLog?: BusinessSyncLog;
}
