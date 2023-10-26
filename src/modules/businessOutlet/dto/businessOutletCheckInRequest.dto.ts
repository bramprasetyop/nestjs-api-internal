import { ArgsType, Field, Float, Int } from '@nestjs/graphql';

@ArgsType()
export class BusinessOutletCheckInRequest {
  @Field(() => Float)
  currentLat: number;

  @Field(() => Float)
  currentLng: number;

  @Field(() => String)
  businessOutletId: string;
}
