import {
  Field,
  Int,
  Float,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';

@ObjectType()
export class BusinessOutletDailyFinanceReportMenuItem {
  @Field()
  channelName: string;

  @Field()
  businessItemName: string;

  @Field(type => Int, { defaultValue: 0 })
  quantity: number;

  @Field(type => Float, { defaultValue: 0 })
  onlineGrossAmount: number;

  @Field(type => Float, { defaultValue: 0 })
  onlineMitraTransferAmount: number;
}
