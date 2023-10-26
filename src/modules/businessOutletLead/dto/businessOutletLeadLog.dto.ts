import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import {
  BusinessOutletLeadLogModel,
  BusinessOutletLeadModel,
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadRejectedReason,
  BusinessOutletLeadStatus
} from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { Organization } from 'src/modules/organization/dto/organization.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';

@ObjectType()
export class BusinessOutletLeadLog {
  constructor(model: BusinessOutletLeadLogModel) {
    this.id = model.id;
    this.businessOutletLeadId = model.businessOutletLeadId;
    this.name = model.name;
    this.status = model.status;
    this.ongoingStatus = model.ongoingStatus;
    this.rejectedReason = model.rejectedReason;
    this.interviewSchedule = model.interviewSchedule;
    this.surveySchedule = model.surveySchedule;
    this.trainingSchedule = model.trainingSchedule;
    this.expiredSchedule = model.expiredSchedule;
    this.updatedBy = model.updatedBy;
    this.modifier = model.modifier
      ? UserMapper.modelToDTO(model.modifier)
      : null;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessOutletLeadId: string;

  @Field()
  name: string;

  @Field(type => BusinessOutletLeadStatus)
  status: BusinessOutletLeadStatus;

  @Field(type => BusinessOutletLeadOngoingStatus)
  ongoingStatus: BusinessOutletLeadOngoingStatus;

  @Field(type => BusinessOutletLeadRejectedReason, { nullable: true })
  rejectedReason?: BusinessOutletLeadRejectedReason;

  @Field({ nullable: true })
  interviewSchedule?: Date;

  @Field({ nullable: true })
  surveySchedule?: Date;

  @Field({ nullable: true })
  expiredSchedule?: Date;

  @Field({ nullable: true })
  trainingSchedule?: Date;

  @Field({ nullable: true })
  updatedBy?: string;

  @Field(type => OrganizationUser, { nullable: true })
  modifier?: OrganizationUser;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
