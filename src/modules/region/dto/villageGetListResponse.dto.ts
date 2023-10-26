import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { Village } from './village.dto';

@ObjectType()
export class VillageGetListResponse {
  @Field(type => [Village])
  villages: Village[];

  @Field()
  meta: PaginationMeta;
}
