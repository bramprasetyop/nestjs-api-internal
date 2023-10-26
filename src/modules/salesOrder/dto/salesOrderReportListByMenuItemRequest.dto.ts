import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
@InputType()
@ArgsType()
export class SalesOrderReportByMenuItemRequest {
  @Field(type => ID)
  businessOutletId: string;

  @Field(type => Date)
  startDate: Date;

  @Field(type => Date)
  endDate: Date;
}
