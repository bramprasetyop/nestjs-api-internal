import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SalesOrderSyncStatus {
  constructor(id: string, refId: string, isSynced: boolean) {
    this.id = id;
    this.refId = refId;
    this.isSynced = isSynced;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  refId: string;

  @Field()
  isSynced: boolean;
}

@ObjectType()
export class SalesOrderSyncStatusResponse {
  constructor(salesOrderSyncStatuses: SalesOrderSyncStatus[]) {
    this.salesOrderSyncStatuses = salesOrderSyncStatuses;
  }

  @Field(type => [SalesOrderSyncStatus])
  salesOrderSyncStatuses: SalesOrderSyncStatus[];
}
