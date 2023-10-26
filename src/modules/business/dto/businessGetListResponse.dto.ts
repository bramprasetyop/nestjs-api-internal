import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { Business } from './business.dto';

@ObjectType()
export class BusinessGetListResponse {
  @Field(type => [Business])
  businesses: Business[];

  @Field()
  meta: PaginationMeta;
}
