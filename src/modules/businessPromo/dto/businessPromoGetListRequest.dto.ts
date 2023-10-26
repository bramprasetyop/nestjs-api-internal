import {
  ArgsType,
  Field,
  InputType,
  ID,
  Int,
  registerEnumType
} from '@nestjs/graphql';
import { BusinessPromosStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Pagination } from 'src/commons/pagination.dto';
import { SortBy, SortOrder } from 'src/commons/pagination.dto';

registerEnumType(BusinessPromosStatus, {
  name: 'BusinessPromosStatus',
  description: 'Business Promo Status'
});

@InputType()
export class BusinessPromoFilter {
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

  @Field(() => BusinessPromosStatus, { nullable: true })
  status: BusinessPromosStatus;
}

@ArgsType()
export class BusinessPromoGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessPromoFilter;

  search: string;

  @Field(type => Int, { nullable: true, defaultValue: 0 })
  page?: number;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  pageSize?: number;

  @Field(type => SortBy, {
    nullable: true,
    defaultValue: {
      columnName: 'createdAt',
      sortOrder: 'DESC'
    }
  })
  sortBy?: SortBy;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
