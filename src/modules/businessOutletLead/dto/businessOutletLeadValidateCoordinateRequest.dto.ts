import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class BusinessOutletLeadValidateCoordinateRequest {
  @Field(type => Float)
  lat: number;

  @Field(type => Float)
  lng: number;

  @Field()
  businessId: string;
}
