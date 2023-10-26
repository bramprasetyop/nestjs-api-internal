import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessSalesChannelCategoryModel } from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessSalesChannel } from 'src/modules/businessSalesChannel/dto/businessSalesChannel.dto';
import { BusinessSalesChannelMapper } from 'src/modules/businessSalesChannel/mappers/businessSalesChannel.mapper';

@ObjectType()
export class BusinessSalesChannelCategory {
  constructor(model: BusinessSalesChannelCategoryModel) {
    this.id = model.id;
    this.name = model.name;
    this.businessId = model.businessId;
    this.businessSalesChannels = model.businessSalesChannels
      ? BusinessSalesChannelMapper.modelsToDTOs(model.businessSalesChannels)
      : [];
    this.sequence = model.sequence;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field(() => Business)
  business: Business;

  @Field()
  name: string;

  @Field()
  sequence: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field(type => [BusinessSalesChannel], { nullable: true })
  businessSalesChannels?: BusinessSalesChannel[];
}
