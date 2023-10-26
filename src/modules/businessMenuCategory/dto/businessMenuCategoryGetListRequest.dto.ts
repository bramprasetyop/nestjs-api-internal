import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessMenuCategoryFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  businessId: string;

  @Field(type => String, { nullable: true })
  parentId: string;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => Boolean, { nullable: true })
  isRoot: boolean;

  @Field(type => Boolean, { nullable: true })
  isLeaf: boolean;

  @Field(type => Date, { nullable: true })
  startDate: string;

  @Field(type => Date, { nullable: true })
  endDate: string;
}

@ArgsType()
export class BusinessMenuCategoryGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessMenuCategoryFilter;

  @Field(type => String, { nullable: true })
  search: string;
}
