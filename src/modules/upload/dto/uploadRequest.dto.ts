import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

export enum UploadAccessType {
  public = 'public',
  protected = 'protected'
}

registerEnumType(UploadAccessType, {
  name: 'UploadAccessType',
  description: 'UploadAccessType'
});

@ArgsType()
export class UploadRequest {
  @Field(() => String)
  folder: string;

  @Field(() => UploadAccessType)
  accessType: UploadAccessType;

  @Field(() => GraphQLUpload)
  file: FileUpload;
}
