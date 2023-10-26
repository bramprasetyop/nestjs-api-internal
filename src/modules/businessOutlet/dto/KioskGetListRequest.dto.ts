import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Pagination, SortBy } from 'src/commons/pagination.dto';
import { FilterKioskStatus } from 'src/modules/external/interfaces/kiosk.interface';

registerEnumType(FilterKioskStatus, {
  name: 'FilterKioskStatus',
  description: 'FilterKioskStatus'
});

@InputType()
export class KioskFilter {
  @Field(type => FilterKioskStatus, { nullable: true })
  status: FilterKioskStatus;

  @Field({ nullable: true })
  kioskId: string;

  @Field({ nullable: true })
  provinceId: string;

  @Field({ nullable: true })
  cityId: string;

  @Field({ nullable: true })
  villageId: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  lat: number;

  @Field({ nullable: true })
  lng: number;
}

@ArgsType()
export class KioskGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: KioskFilter;

  @Field({ nullable: true })
  search: string;

  @Field()
  page: number = 0;

  @Field()
  pageSize: number = 10;

  @Field({ nullable: true })
  sortBy: SortBy;
}
