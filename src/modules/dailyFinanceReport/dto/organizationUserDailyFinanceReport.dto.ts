import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationUserDailyFinanceReportModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { XWahyooPaymentAdjustmentRequestDetailMapper } from '../mappers/xWahyooPaymentAdjustmentRequestDetail.mapper';
import { XWahyooPaymentAdjustmentRequestDetail } from './xWahyooPaymentAdjustmentRequestDetail.dto';

@ObjectType()
export class OrganizationUserDailyFinanceReport {
  constructor(model: OrganizationUserDailyFinanceReportModel) {
    this.id = model.id;
    this.organizationUserId = model.organizationUserId;
    this.day = model.day;
    this._amountOffline = model._amountOffline;
    this._amountOnline = model._amountOnline;
    this._amountToBeTransferred = model._amountToBeTransferred;
    this._numberOfOrders = model._numberOfOrders;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
    this.xWahyooPaymentAdjustmentRequestDetail = model.xWahyooPaymentAdjustmentRequestDetail
      ? XWahyooPaymentAdjustmentRequestDetailMapper.modelToDTO(
          model.xWahyooPaymentAdjustmentRequestDetail
        )
      : null;
    this.isUnprocessed = model.isUnprocessed;
    this.unprocessedNumber = model.unprocessedNumber;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationUserId: string;
  @Field({ nullable: true })
  organizationUser?: OrganizationUser;

  @Field()
  day: string;

  @Field()
  _amountOffline: number;

  @Field()
  _amountOnline: number;

  @Field()
  _amountToBeTransferred: number;

  @Field()
  _numberOfOrders: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt?: Date;

  @Field({ nullable: true })
  xWahyooPaymentAdjustmentRequestDetail?: XWahyooPaymentAdjustmentRequestDetail;

  @Field(type => ID, { nullable: true })
  organizationUserDailyFeeReportId: string;

  @Field({ nullable: true })
  isUnprocessed?: boolean;

  @Field({ nullable: true })
  unprocessedNumber?: number;
}
