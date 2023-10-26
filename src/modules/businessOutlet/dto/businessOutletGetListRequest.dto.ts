import {
  ArgsType,
  Field,
  ID,
  InputType,
  registerEnumType
} from '@nestjs/graphql';
import { DateFilter } from 'src/commons/dateFilter';
import { Pagination } from 'src/commons/pagination.dto';

export enum FilterBusinessOutletStatus {
  all = 'all',
  active = 'active',
  suspended = 'suspended',
  closed = 'closed'
}

registerEnumType(FilterBusinessOutletStatus, {
  name: 'FilterBusinessOutletStatus',
  description: 'FilterBusinessOutletStatus'
});

@InputType()
export class BusinessOutletFilter {
  @Field(type => FilterBusinessOutletStatus, { nullable: true })
  status: FilterBusinessOutletStatus;

  @Field(type => Boolean, { nullable: true })
  posAvailable: boolean;

  @Field(type => Boolean, { defaultValue: false })
  isUnassignedToHubsterStore: boolean;

  @Field(type => DateFilter, { nullable: true })
  createdAt: DateFilter;

  @Field({ nullable: true })
  tkbRegion: string;
}

@ArgsType()
export class BusinessOutletGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessOutletFilter;

  @Field(type => ID)
  businessId: string;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;

  // NOT EXPOSE TO GRAPHQL
  // no need decoration @Field()
  businessOutletIds?: String[];
}
