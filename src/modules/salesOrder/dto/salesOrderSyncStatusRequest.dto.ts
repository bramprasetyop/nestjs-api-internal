import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class SalesOrderSyncStatusInput {
  @Field(type => ID)
  refId: string;

  @Field()
  updatedAt: Date;
}

@InputType()
export class SalesOrderSyncStatusRequest {
  @Field(type => [SalesOrderSyncStatusInput])
  salesOrderSyncStatusInputs: SalesOrderSyncStatusInput[];
}
