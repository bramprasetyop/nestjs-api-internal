import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { District } from './district.dto';

@ObjectType()
export class DistrictGetListResponse {
  @Field(type => [District])
  districts: District[];

  @Field()
  meta: PaginationMeta;
}
