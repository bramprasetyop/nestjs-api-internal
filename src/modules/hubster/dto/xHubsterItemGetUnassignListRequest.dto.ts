import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@ArgsType()
export class XHubsterItemGetUnassignListRequest {
  @Field(type => String, { nullable: true })
  search: string;
}
