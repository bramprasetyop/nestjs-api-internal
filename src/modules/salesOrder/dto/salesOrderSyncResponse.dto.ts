import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SalesOrderSyncStatus } from './salesOrderSyncStatusResponse.dto';

@ObjectType()
export class SalesOrderSyncResponse {
  constructor(salesOrderSyncStatuses: SalesOrderSyncStatus[]) {
    this.salesOrderSyncStatuses = salesOrderSyncStatuses;
  }

  @Field(type => [SalesOrderSyncStatus])
  salesOrderSyncStatuses: SalesOrderSyncStatus[];
}
