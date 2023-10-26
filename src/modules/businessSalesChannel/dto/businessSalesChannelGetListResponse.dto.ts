import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessSalesChannel } from './businessSalesChannel.dto';

@ObjectType()
export class BusinessSalesChannelGetListResponse {
  @Field(type => [BusinessSalesChannel])
  businessSalesChannels: BusinessSalesChannel[];

  @Field()
  meta: PaginationMeta;
}
