import { Field, ArgsType, Int } from '@nestjs/graphql';
import { SortBy, SortOrder } from 'src/commons/pagination.dto';

@ArgsType()
export class AppVersionListRequest {
  @Field(type => Int)
  page: number;

  @Field(type => Int)
  pageSize: number;

  @Field(type => SortBy, {
    nullable: true,
    defaultValue: {
      columnName: 'createdAt',
      sortOrder: SortOrder.DESC
    }
  })
  sortBy?: SortBy;

  @Field(() => String, { nullable: true })
  search?: string;
}
