import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class OrganizationUserDeleteOutletEmployeeRequest {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  deletedBy: string;
}
