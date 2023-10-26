import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import {
  BusinessOutletQualityControlModel,
  BusinessOutletQualityControlStatus
} from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMapper } from 'src/modules/business/mappers/business.mapper';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';

registerEnumType(BusinessOutletQualityControlStatus, {
  name: 'BusinessOutletQualityControlStatus',
  description: 'qc status'
});

@ObjectType()
export class BusinessOutletQualityControl {
  constructor(model: BusinessOutletQualityControlModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.business = model.business
      ? BusinessMapper.modelToDTO(model.business)
      : null;
    this.organizationUserId = model.organizationUserId;
    this.businessOutletId = model.businessOutletId;
    this.businessOutlet = model.businessOutlet
      ? BusinessOutletMapper.modelToDTO(model.businessOutlet)
      : null;
    this.title = model.title;
    this.status = model.status;
    this._qcTemplateJson = model._qcTemplateJson;
    this.qcResponseJson = model.qcResponseJson;
    this.submittedAt = model.submittedAt;
    this.expiredAt = model.expiredAt;
    this.reviewedBy = model.reviewedBy;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => Business)
  business: Business;

  @Field(type => ID)
  organizationUserId: string;

  @Field(type => ID)
  businessOutletId: string;

  @Field(type => BusinessOutlet)
  businessOutlet: BusinessOutlet;

  @Field()
  title: string;

  @Field(Type => BusinessOutletQualityControlStatus)
  status: BusinessOutletQualityControlStatus;

  @Field(() => JSON, { nullable: true })
  _qcTemplateJson: object;

  @Field(() => JSON, { nullable: true })
  qcResponseJson?: object;

  @Field({ nullable: true })
  submittedAt?: Date;

  @Field({ nullable: true })
  expiredAt?: Date;

  @Field(type => ID, { nullable: true })
  reviewedBy?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
