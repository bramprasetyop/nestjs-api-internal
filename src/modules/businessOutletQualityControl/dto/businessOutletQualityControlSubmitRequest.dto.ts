import { ArgsType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@ArgsType()
export class BusinessOutletQualityControlSubmitRequest {
  @Field(type => ID)
  id: string;

  @Field(type => JSON)
  qcResponseJson: any;
}
