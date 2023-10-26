import {
  ArgsType,
  Field,
  Int,
  ID,
  registerEnumType,
  InputType
} from '@nestjs/graphql';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

@InputType()
export class SortBy {
  @Field()
  columnName: string = 'createdAt';

  @Field()
  sortOrder: SortOrder = SortOrder.ASC;
}

registerEnumType(SortOrder, {
  name: 'SortOrder'
});

@ArgsType()
export class Pagination {
  @Field(type => Int, { nullable: true, defaultValue: 0 })
  page?: number;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  pageSize?: number;

  @Field(type => SortBy, {
    nullable: true,
    defaultValue: {
      columnName: 'createdAt',
      sortOrder: SortOrder.ASC
    }
  })
  sortBy?: SortBy;

  @Field({ nullable: true })
  search?: string;
}
