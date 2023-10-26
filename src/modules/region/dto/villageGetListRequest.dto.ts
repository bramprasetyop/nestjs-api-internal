import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class VillageFilter {
  @Field(type => String, { nullable: true })
  districtName: string;

  @Field(type => String, { nullable: true })
  cityName: string;
}

@ArgsType()
export class VillageGetListRequest extends Pagination {
  @Field(type => ID, { nullable: true })
  districtId: string;

  @Field({ nullable: true })
  filter: VillageFilter;
}
