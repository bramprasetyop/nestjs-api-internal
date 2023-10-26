import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrganizationModel } from '@wahyoo/wahyoo-shared';
import { OrganizationStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';

registerEnumType(OrganizationStatus, {
  name: 'OrganizationStatus',
  description: 'organization status'
});

@ObjectType()
export class Organization {
  constructor(model: OrganizationModel) {
    this.id = model.id;
    this.name = model.name;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: OrganizationStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
