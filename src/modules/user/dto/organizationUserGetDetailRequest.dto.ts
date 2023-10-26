import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';

@ArgsType()
export class OrganizationUserGetDetailRequest {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  currentUserId: string;
}
