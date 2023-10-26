import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessSalesChannelCategoryFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => ID, { nullable: true })
  businessId: string;
}

@ArgsType()
export class BusinessSalesChannelCategoryGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessSalesChannelCategoryFilter;
  search: string;
}
