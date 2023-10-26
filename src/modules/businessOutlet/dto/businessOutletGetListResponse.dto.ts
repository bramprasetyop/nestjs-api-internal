import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessOutlet } from './businessOutlet.dto';

@ObjectType()
export class BusinessOutletGetListResponse {
  @Field(type => [BusinessOutlet])
  businessOutlets: BusinessOutlet[];

  @Field()
  meta: PaginationMeta;
}
