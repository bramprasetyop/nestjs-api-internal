import {
  Field,
  Int,
  Float,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';

@ObjectType()
export class BusinessOutletDailyFinanceReportSalesChannelSummary {
  @Field(type => Int, { defaultValue: 0 })
  totalOrders: number;

  @Field(type => Float, { defaultValue: 0 })
  totalOnlineGrossAmount: number;

  @Field(type => Float, { defaultValue: 0 })
  totalOnlineMitraTransferAmount: number;
}
