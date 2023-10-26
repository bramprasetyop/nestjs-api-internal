import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { OrganizationUserModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';
import { BusinessOutletProperty } from 'src/modules/businessOutletProperty/dto/businessOutletProperty.dto';
import { BusinessProperty } from 'src/modules/businessProperty/dto/businessProperty.dto';
import { Organization } from 'src/modules/organization/dto/organization.dto';

@ObjectType()
export class OrganizationUserDailyFeeAssignment {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  countryCode: string;

  @Field()
  phoneNumber: string;

  @Field(() => [BusinessOutletProperty], { nullable: true })
  linkedBusinessOutletProperties?: BusinessOutletProperty[];

  @Field(type => Float, { defaultValue: 0 })
  dailyTransferFee: number;

  @Field({ nullable: true })
  lastDailyFeeStatus?: string;

  @Field()
  updatedAt: Date;
}
