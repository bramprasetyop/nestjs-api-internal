import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BusinessSalesChannelPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannel } from './businessSalesChannel.dto';
import { BusinessPaymentType } from 'src/modules/businessPaymentType/dto/businessPaymentType.dto';
import { BusinessPaymentTypeMapper } from 'src/modules/businessPaymentType/mappers/businessPaymentType.mapper';

@ObjectType()
export class BusinessSalesChannelPaymentType {
  constructor(model: BusinessSalesChannelPaymentTypeModel) {
    this.id = model.id;
    this.businessSalesChannelId = model.businessSalesChannelId;
    this.businessPaymentTypeId = model.businessPaymentTypeId;
    this.businessPaymentType = model.businessPaymentType
      ? BusinessPaymentTypeMapper.modelToDTO(model.businessPaymentType)
      : null;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessSalesChannelId: string;

  @Field(type => ID)
  businessPaymentTypeId: string;

  @Field(() => BusinessSalesChannel)
  businessSalesChannel: BusinessSalesChannel;

  @Field(() => BusinessPaymentType, { nullable: true })
  businessPaymentType?: BusinessPaymentType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
