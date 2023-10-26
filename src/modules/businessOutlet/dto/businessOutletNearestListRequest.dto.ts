import { ArgsType, Field, Float, Int } from '@nestjs/graphql';

@ArgsType()
export class BusinessOutletNearestListRequest {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => [String], { defaultValue: ['bgbt'] })
  tags?: string[];

  @Field(() => Int, { defaultValue: 100 })
  pageSize?: number;

  // NOT EXPOSE TO GRAPHQL
  // no need decoration @Field()
  businessOutletIds?: String[];
}
