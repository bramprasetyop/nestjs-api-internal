import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class BusinessOutletLeadUpdateRequest {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @MaxLength(30)
  phoneNumber?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  ktpNumber?: string;

  @Field({ nullable: true })
  ktpAddress?: string;

  @Field({ nullable: true })
  ktpVillageName?: string;

  @Field({ nullable: true })
  ktpDistrictName: string;

  @Field({ nullable: true })
  ktpCityName?: string;

  @Field({ nullable: true })
  ktpProvinceName?: string;

  @Field({ nullable: true })
  bankAccountProviderName?: string;

  @Field({ nullable: true })
  bankAccountName?: string;

  @Field({ nullable: true })
  bankAccountNumber?: string;

  @Field({ nullable: true })
  domicileAddress?: string;
}
