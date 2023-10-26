import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReadFileGoogleCloudStorageResponseMeta {
  @Field()
  expiry: Date;
}

@ObjectType()
export class ReadFileGoogleCloudStorageResponse {
  @Field(type => [String])
  data: string[];

  @Field()
  meta: ReadFileGoogleCloudStorageResponseMeta;
}
