import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@ArgsType()
export class SalesOrderReportByChannelRequest {
  @Field(type => ID)
  businessOutletId: string;

  @Field(type => Date)
  startDate: Date;

  @Field(type => Date)
  endDate: Date;
}
