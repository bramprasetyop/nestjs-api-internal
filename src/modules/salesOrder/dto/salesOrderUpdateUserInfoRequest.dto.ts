import { Field, InputType, ID } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';

@InputType()
export class SalesOrderUpdateUserInfoRequest {
  @Field(() => ID)
  id: string;

  @Field()
  userName: string;

  @Field()
  @IsPhoneNumber('ID')
  userPhoneNumber: string;
}
