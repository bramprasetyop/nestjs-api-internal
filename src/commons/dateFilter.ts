import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DateFilter {
  @Field({ nullable: true })
  startDate: Date;
  @Field({ nullable: true })
  endDate: Date;
}
