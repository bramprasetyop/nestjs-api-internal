import { ArgsType, ID, Field } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@ArgsType()
export class DistrictGetListRequest extends Pagination {
  @Field(type => ID, { nullable: true })
  cityId: string;
}
