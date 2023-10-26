import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessPaymentTypeFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => ID, { nullable: true })
  businessId: string;
}

@ArgsType()
export class BusinessPaymentTypeGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessPaymentTypeFilter;
  search: string;
}
