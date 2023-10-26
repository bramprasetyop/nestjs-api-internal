import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class OrganizationFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  name: string;
}

@ArgsType()
export class OrganizationGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: OrganizationFilter;
}
