import { Field, ID, ObjectType } from '@nestjs/graphql';
import { XOrganizationUserWahyooUserModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUser } from './user.dto';

@ObjectType()
export class XOrganizationUserWahyooUser {
  constructor(model: XOrganizationUserWahyooUserModel) {
    this.id = model.id;
    this.organizationUserId = model.organizationUserId;
    this.xWahyooUserId = model.xWahyooUserId;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationUserId: string;

  @Field(() => OrganizationUser)
  organizationUser: OrganizationUser;

  @Field(type => ID)
  xWahyooUserId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
