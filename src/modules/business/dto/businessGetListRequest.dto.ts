import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => ID, { nullable: true })
  organizationId: string;
}

@ArgsType()
export class BusinessGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
