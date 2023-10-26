import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessOutletQualityControl } from './businessOutletQualityControl.dto';

@ObjectType()
export class BusinessOutletQualityControlGetListResponse {
  @Field(type => [BusinessOutletQualityControl])
  businessOutletQualityControls: BusinessOutletQualityControl[];

  @Field()
  meta: PaginationMeta;
}
