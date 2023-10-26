import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessOutletDailyFinanceReportModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { OrganizationUserDailyFinanceReport } from './organizationUserDailyFinanceReport.dto';

@ObjectType()
export class BusinessOutletDailyFinanceReport {
  constructor(model: BusinessOutletDailyFinanceReportModel) {
    this.id = model.id;
    this.organizationUserId = model.organizationUserId;
    this.businessOutletId = model.businessOutletId;
    this.organizationUserDailyFinanceReportId =
      model.organizationUserDailyFinanceReportId;
    this.day = model.day;
    this._amountOffline = model._amountOffline;
    this._amountOnline = model._amountOnline;
    this._amountToBeTransferred = model._amountToBeTransferred;
    this._numberOfOrders = model._numberOfOrders;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationUserId: string;
  @Field()
  organizationUser: OrganizationUser;

  @Field(type => ID)
  businessOutletId: string;
  @Field({ nullable: true })
  businessOutlet: BusinessOutlet;

  @Field(type => ID)
  organizationUserDailyFinanceReportId: string;
  @Field({ description: 'Do not use! Not implemented yet' })
  organizationUserDailyFinanceReport: OrganizationUserDailyFinanceReport;

  @Field()
  day: string;

  @Field()
  _amountOffline: number;

  @Field()
  _amountOnline: number;

  @Field()
  _numberOfOrders: number;

  @Field()
  _amountToBeTransferred: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt?: Date;
}
