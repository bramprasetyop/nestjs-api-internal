import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BusinessOutletLeadGenerateNameResponse {
  @Field(type => String, { nullable: true })
  outletName: string;
}
