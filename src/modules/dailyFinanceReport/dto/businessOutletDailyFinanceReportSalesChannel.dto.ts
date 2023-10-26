import {
  Field,
  Int,
  Float,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';

@ObjectType()
export class BusinessOutletDailyFinanceReportSalesChannel {
  @Field()
  channelName: string;

  @Field(type => Int, { defaultValue: 0 })
  numberOfOrders: number;

  @Field(type => Float, { defaultValue: 0 })
  onlineGrossAmount: number;

  @Field(type => Float, { defaultValue: 0 })
  onlineMitraTransferAmount: number;
}
