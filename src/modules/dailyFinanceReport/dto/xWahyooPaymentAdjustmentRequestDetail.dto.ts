import { Field, ID, ObjectType } from '@nestjs/graphql';
import { XWahyooPaymentAdjustmentRequestDetailModel } from '@wahyoo/wahyoo-shared';

@ObjectType()
export class XWahyooPaymentAdjustmentRequestDetail {
  constructor(model: XWahyooPaymentAdjustmentRequestDetailModel) {
    this.id = model.id;
    this.organizationUserDailyFinanceReportId =
      model.organizationUserDailyFinanceReportId;
    this.organizationUserDailyFeeReportId =
      model.organizationUserDailyFeeReportId;
    this.xPaymentAdjustmentRequestId = model.xPaymentAdjustmentRequestId;
    this.xPaymentAdjustmentRequestStatus =
      model.xPaymentAdjustmentRequestStatus;
    this.xPaymentAdjustmentRequestAmount =
      model.xPaymentAdjustmentRequestAmount;
    this.xPaymentAdjustmentRequestNotes = model.xPaymentAdjustmentRequestNotes;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID, { nullable: true })
  organizationUserDailyFinanceReportId?: string;

  @Field(type => ID, { nullable: true })
  organizationUserDailyFeeReportId?: string;

  @Field(type => ID)
  xPaymentAdjustmentRequestId: number;

  @Field()
  xPaymentAdjustmentRequestStatus: string;

  @Field()
  xPaymentAdjustmentRequestAmount: number;

  @Field({ nullable: true })
  xPaymentAdjustmentRequestNotes?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt?: Date;
}
