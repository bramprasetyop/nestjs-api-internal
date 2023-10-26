import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BusinessOutletLeadIntersectionDetail {
  @Field(type => String)
  name: string;

  @Field(type => Float)
  intersectionPct: number;
}

@ObjectType()
export class BusinessOutletLeadCalculateLocationIntersectionResponse {
  @Field(type => Float)
  totalIntersectionPct: number;

  @Field(type => [BusinessOutletLeadIntersectionDetail])
  intersectionDetails: BusinessOutletLeadIntersectionDetail[];
}
