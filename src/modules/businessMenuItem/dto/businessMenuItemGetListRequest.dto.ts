import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessMenuItemFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => ID, { nullable: true })
  businessMenuCategoryId: string;

  @Field(type => Boolean, { defaultValue: false })
  isUnassignedToHubsterItem: boolean;

  @Field(type => Boolean, { defaultValue: false })
  isUnassignedToKlikitItem: boolean;

  @Field(type => String, { nullable: true })
  businessId: string;

  @Field(type => Number, { nullable: true })
  minPriceBase: number;

  @Field(type => Number, { nullable: true })
  maxPriceBase: number;

  @Field(type => Date, { nullable: true })
  startDate: string;

  @Field(type => Date, { nullable: true })
  endDate: string;
}

@ArgsType()
export class BusinessMenuItemGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessMenuItemFilter;

  @Field(type => String, { nullable: true })
  search: string;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
