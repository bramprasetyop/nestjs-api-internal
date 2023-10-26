import moment from 'moment';
import { IUseCase } from 'src/commons/useCase.interface';
import { Op, Sequelize } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import { OrganizationUserRole } from 'src/modules/auth/auth.constants';
import { CheckAndCreateBusinessOutletQualityControlRequest } from '../dto/checkAndCreateBusinessOutletQualityControlRequest.dto';
import {
  BusinessOutletModel,
  BusinessPropertyModel,
  BusinessOutletQualityControlStatus,
  InjectionKey,
  BusinessOutletQualityControlModel,
  BusinessOutletQualityControlLogModel,
  OrganizationUserBusinessOutletModel,
  QualityControlNotificationService,
  BusinessOutletStatus
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class CheckAndCreateBusinessOutletQualityControlUseCase
  implements IUseCase {
  private sequelize: Sequelize;

  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_MODEL)
    private readonly businessOutletModel: typeof BusinessOutletModel,
    @Inject(InjectionKey.BUSINESS_PROPERTY_MODEL)
    private readonly businessPropertyModel: typeof BusinessPropertyModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_QUALITY_CONTROL_MODEL)
    private readonly businessOutletQualityControlModel: typeof BusinessOutletQualityControlModel,
    private qualityControlNotification: QualityControlNotificationService
  ) {
    this.sequelize = this.businessOutletQualityControlModel.sequelize;
  }

  async execute(dto: CheckAndCreateBusinessOutletQualityControlRequest) {
    const SCHEDULER_WORKING_DAY: number = 5;
    try {
      const { isAllOutlet } = dto;

      const excludedBusinessOutletData = await this.businessOutletQualityControlModel.findAll(
        {
          attributes: ['businessOutletId'],
          where: this.sequelize.Sequelize.literal(
            `created_at >= cast(date_trunc('week', current_date) as date) + 0
           and created_at <= cast(date_trunc('week', current_date) as date) + 6
          `
          )
        }
      );
      const excludedBusinessOutletIds = excludedBusinessOutletData.map(
        data => data.businessOutletId
      );
      console.log('excludedIds', excludedBusinessOutletIds);

      const totalBusinessOutlets = await this.businessOutletModel.count({
        distinct: true,
        where: {
          status: BusinessOutletStatus.active
        },
        include: [
          {
            required: true,
            attributes: ['organizationUserId'],
            model: OrganizationUserBusinessOutletModel
          }
        ]
      });
      const limit = Math.round(totalBusinessOutlets / SCHEDULER_WORKING_DAY);

      console.log('totalBusinessOutlets', totalBusinessOutlets),
        console.log('limit', limit);

      const businessOutlets = await this.businessOutletModel.findAll({
        where: {
          id: {
            [Op.notIn]: excludedBusinessOutletIds
          },
          status: BusinessOutletStatus.active
        },
        include: [
          {
            required: true,
            attributes: ['organizationUserId'],
            model: OrganizationUserBusinessOutletModel,
            where: {
              roles: { [Op.contains]: [OrganizationUserRole.OUTLET_OWNER] }
            }
          }
        ],
        order: this.sequelize.random(),
        ...(moment().day() !== 5 && !isAllOutlet && { limit })
      });
      const arrBusinessId = businessOutlets.map(data => data.businessId);

      const businessProperties = await this.businessPropertyModel.findAll({
        where: {
          businessId: { [Op.in]: arrBusinessId }
        }
      });

      // create business outlet quality control
      const businessOutletQualityControls = [];
      for (let i = 0; i < businessOutlets.length; i++) {
        businessOutletQualityControls.push({
          businessId: businessOutlets[i].businessId,
          businessOutletId: businessOutlets[i].id,
          organizationUserId:
            businessOutlets[i].organizationUserBusinessOutlets[0]
              .organizationUserId,
          title: `QC ${businessOutlets[i].name} ${moment().format(
            'DD MMM YYYY'
          )} `,
          status: BusinessOutletQualityControlStatus.new,
          _qcTemplateJson: businessProperties.find(
            data => data.businessId === businessOutlets[i].businessId
          ).qcTemplateJson,
          qcResponseJson: {},
          businessOutletQualityControlLogs: [
            {
              status: BusinessOutletQualityControlStatus.new,
              reviewedBy: null
            }
          ],
          expiredAt: moment()
            .add(24, 'hours')
            .toDate()
        });
      }

      console.log(businessOutletQualityControls);

      // create batch data
      const createdBusinessOutletQualityControls = await this.businessOutletQualityControlModel.bulkCreate(
        businessOutletQualityControls,
        {
          include: [
            {
              model: BusinessOutletQualityControlLogModel,
              as: 'businessOutletQualityControlLogs'
            }
          ]
        }
      );

      // send notification
      createdBusinessOutletQualityControls.forEach(
        createdBusinessOutletQualityControl => {
          this.qualityControlNotification.notifyUser(
            createdBusinessOutletQualityControl
          );
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
