import { Field, InputType, ID } from '@nestjs/graphql';
import { BusinessOutletUpdateRequest } from './businessOutletUpdateRequest.dto';
import { BusinessOutletPropertyUpdateRequest } from './businessOutletPropertyUpdateRequest.dto';

@InputType()
export class BusinessOutletAndPropertyUpdateRequest {
  @Field(type => BusinessOutletUpdateRequest)
  businessOutletDto: BusinessOutletUpdateRequest;

  @Field(type => BusinessOutletPropertyUpdateRequest)
  businessOutletPropertyDto: BusinessOutletPropertyUpdateRequest;
}
