import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class OrganizationUserCreateOutletEmployeeRequest {
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
  createdBy: string;

  updatedBy: string;
}
