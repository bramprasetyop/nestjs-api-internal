import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessMenuModifier } from './businessMenuModifier.dto';

@ObjectType()
export class BusinessMenuModifierGetListResponse {
  @Field(type => [BusinessMenuModifier])
  businessMenuModifiers: BusinessMenuModifier[];

  @Field()
  meta: PaginationMeta;
}
