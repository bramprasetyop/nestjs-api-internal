import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@ArgsType()
export class XHubsterStoreGetUnassignListRequest {
  @Field(type => String, { nullable: true })
  search: string;
}
