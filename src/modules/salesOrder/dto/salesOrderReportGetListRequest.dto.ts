import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@ArgsType()
export class SalesOrderReportGetListRequest extends Pagination {
  @Field(type => ID)
  businessOutletId: string;

  @Field(type => Date)
  startDate: Date;

  @Field(type => Date)
  endDate: Date;

  @Field(type => Boolean, { defaultValue: true })
  isPaginated: Boolean;
}
