import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { Province } from './province.dto';

@ObjectType()
export class ProvinceGetListResponse {
  @Field(type => [Province])
  provinces: Province[];

  @Field()
  meta: PaginationMeta;
}
