import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { Kiosk } from './kiosk.dto';

@ObjectType()
export class KioskGetListResponse {
  @Field(type => [Kiosk])
  kiosks: Kiosk[];

  @Field()
  meta: PaginationMeta;
}
