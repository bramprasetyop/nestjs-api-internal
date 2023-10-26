import { Field, ObjectType } from '@nestjs/graphql';
import { BusinessSalesChannelCategory } from 'src/modules/businessSalesChannelCategory/dto/businessSalesChannelCategory.dto';

@ObjectType()
export class BusinessSyncResponse {
  @Field(type => [BusinessSalesChannelCategory])
  businessSalesChannelCategories: BusinessSalesChannelCategory[];
}
