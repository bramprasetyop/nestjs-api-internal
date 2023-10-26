import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationUserDailyFeeReportModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { XWahyooPaymentAdjustmentRequestDetailMapper } from '../mappers/xWahyooPaymentAdjustmentRequestDetail.mapper';
import { XWahyooPaymentAdjustmentRequestDetail } from './xWahyooPaymentAdjustmentRequestDetail.dto';

@ObjectType()
export class OrganizationUserDailyFeeReport {
  constructor(model: OrganizationUserDailyFeeReportModel) {
    this.id = model.id;
    this.organizationUserId = model.organizationUserId;
    this.day = model.day;
    this._dailyTransferFee = model._dailyTransferFee;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
    this.xWahyooPaymentAdjustmentRequestDetail = model.xWahyooPaymentAdjustmentRequestDetail
      ? XWahyooPaymentAdjustmentRequestDetailMapper.modelToDTO(
          model.xWahyooPaymentAdjustmentRequestDetail
        )
      : null;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationUserId: string;
  @Field()
  organizationUser: OrganizationUser;

  @Field()
  day: string;

  @Field()
  _dailyTransferFee: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt?: Date;

  @Field({ nullable: true })
  xWahyooPaymentAdjustmentRequestDetail?: XWahyooPaymentAdjustmentRequestDetail;
}
