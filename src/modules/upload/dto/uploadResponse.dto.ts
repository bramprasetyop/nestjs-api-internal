import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class UploadResponse {
  @Field(() => String)
  url: string;
}
