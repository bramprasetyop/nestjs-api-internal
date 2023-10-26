import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { City } from './city.dto';

@ObjectType()
export class CityGetListResponse {
  @Field(type => [City])
  cities: City[];

  @Field()
  meta: PaginationMeta;
}
