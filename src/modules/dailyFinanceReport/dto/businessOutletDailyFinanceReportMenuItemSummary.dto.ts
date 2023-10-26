import {
  Field,
  Int,
  Float,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';

@ObjectType()
export class BusinessOutletDailyFinanceReportMenuItemSummary {
  @Field(type => Int, { defaultValue: 0 })
  totalQuantity: number;

  @Field(type => Float, { defaultValue: 0 })
  totalOnlineGrossAmount: number;

  @Field(type => Float, { defaultValue: 0 })
  totalOnlineMitraTransferAmount: number;
}
