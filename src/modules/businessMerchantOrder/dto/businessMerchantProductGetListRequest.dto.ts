import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessMerchantProductFilter {
  @Field(type => ID)
  bussinessId: string;
}

@ArgsType()
export class BusinessMerchantProductGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessMerchantProductFilter;
}
