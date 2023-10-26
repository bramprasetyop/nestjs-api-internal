import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BusinessOutletQualityControlGetSummaryResponse {
  @Field(type => Int)
  numberOfStatusNew: number;

  @Field(type => Int)
  numberOfStatusWaitingReview: number;

  @Field(type => Int)
  numberOfStatusReviewed: number;

  @Field(type => Int)
  numberOfStatusExpired: number;
}
