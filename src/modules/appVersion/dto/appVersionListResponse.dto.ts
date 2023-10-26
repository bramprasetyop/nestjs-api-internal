import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { type } from 'os';
import { AppVersion } from './appVersion.dto';

@ObjectType()
export class AppVersionListResponse {
  @Field(type => [AppVersion])
  appVersions: AppVersion[];

  @Field()
  meta: PaginationMeta;
}
