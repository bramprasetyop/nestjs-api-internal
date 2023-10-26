import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { XHubsterStoreModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';

@ObjectType()
export class XHubsterStore {
  constructor(model: XHubsterStoreModel) {
    this.id = model.id;
    this.businessOutletId = model.businessOutletId;
    this.businessOutlet = model.businessOutlet
      ? BusinessOutletMapper.modelToDTO(model.businessOutlet)
      : null;
    this.name = model.name;
    this.isDineIn = model.isDineIn;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID, { nullable: true })
  businessOutletId: string;

  @Field(type => BusinessOutlet, { nullable: true })
  businessOutlet: BusinessOutlet;

  @Field()
  name: string;

  @Field(type => Boolean, { nullable: true })
  isDineIn: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
