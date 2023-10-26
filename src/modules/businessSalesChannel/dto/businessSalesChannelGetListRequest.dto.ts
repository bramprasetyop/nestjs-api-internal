import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessSalesChannelFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => ID, { nullable: true })
  businessId: string;

  @Field(type => ID, { nullable: true })
  businessSalesChannelCategoryId: string;
}

@ArgsType()
export class BusinessSalesChannelGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessSalesChannelFilter;
  search: string;
}
