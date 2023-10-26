import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessMenuModifierFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => ID, { nullable: true })
  businessId: string;

  @Field(type => Date, { nullable: true })
  startDate: string;

  @Field(type => Date, { nullable: true })
  endDate: string;
}

@ArgsType()
export class BusinessMenuModifierGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessMenuModifierFilter;

  @Field(type => String, { nullable: true })
  search: string;
}
