import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessPromo } from './businessPromo.dto';

@ObjectType()
export class BusinessPromoListResponse {
  @Field(type => [BusinessPromo])
  businessPromo: BusinessPromo[];

  @Field()
  meta: PaginationMeta;
}
