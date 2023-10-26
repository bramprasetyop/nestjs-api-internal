import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMeta {
  @Field(type => Int)
  total: number;

  @Field(type => Int)
  pageSize: number;

  @Field(type => Int)
  currentPage: number;

  @Field(type => Int)
  totalPage: number;
}
