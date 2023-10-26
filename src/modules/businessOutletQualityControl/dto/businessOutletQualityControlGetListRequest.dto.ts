import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { BusinessOutletQualityControlStatus } from '@wahyoo/wahyoo-shared';
import { DateFilter } from 'src/commons/dateFilter';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessOutletQualityControlFilter {
  organizationUserId?: string;

  @Field(type => ID, { nullable: true })
  businessId?: string;

  @Field(type => ID, { nullable: true })
  businessOutletId?: string;

  businessOutletIds?: string[];

  @Field(type => [BusinessOutletQualityControlStatus], { nullable: true })
  status?: BusinessOutletQualityControlStatus[];

  @Field(type => DateFilter, { nullable: true })
  createdAt?: DateFilter;
}

@ArgsType()
export class BusinessOutletQualityControlGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessOutletQualityControlFilter;

  @Field(type => Boolean, { defaultValue: false })
  disabledPagination: boolean;
}
