import { ArgsType, Field, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@ArgsType()
export class CityGetListRequest extends Pagination {
  @Field(type => ID, { nullable: true })
  provinceId: string;
}
