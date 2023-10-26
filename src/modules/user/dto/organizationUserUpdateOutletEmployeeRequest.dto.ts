import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class OrganizationUserUpdateOutletEmployeeRequest {
  @Field(() => ID)
  id: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  countryCode: string;

  @Field(() => [ID])
  businessOutletIds: [string];

  @Field(() => [String])
  roles: [string];

  @Field(() => ID, { nullable: true })
  updatedBy: string;
}
