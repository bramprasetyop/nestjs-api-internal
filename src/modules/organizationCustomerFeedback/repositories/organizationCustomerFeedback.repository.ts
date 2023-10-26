import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  OrganizationCustomerFeedbackMediaCategory,
  OrganizationCustomerFeedbackMediaModel,
  OrganizationCustomerFeedbackMediaType,
  OrganizationCustomerFeedbackModel
} from '@wahyoo/wahyoo-shared';
import { OrganizationCustomerFeedback } from '../dto/organizationCustomerFeedback.dto';
import { OrganizationCustomerFeedbackCreateRequest } from '../dto/organizationCustomerFeedbackCreateRequest.dto';
import {
  ArgsFindByPhoneNumberAndBusinessOutletId,
  IOrganizationCustomerFeedbackRepository
} from './organizationCustomerFeedback.interface';

@Injectable()
export class OrganizationCustomerFeedbackRepository
  implements IOrganizationCustomerFeedbackRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_CUSTOMER_FEEDBACK_MODEL)
    private readonly organizationCustomerFeedbackModel: typeof OrganizationCustomerFeedbackModel
  ) {}

  public async findById(
    id: string
  ): Promise<OrganizationCustomerFeedbackModel> {
    return await this.organizationCustomerFeedbackModel.findByPk(id);
  }

  public async findByPhoneNumberAndBusinessOutletId(
    args: ArgsFindByPhoneNumberAndBusinessOutletId
  ): Promise<OrganizationCustomerFeedbackModel> {
    const model = await this.organizationCustomerFeedbackModel.findOne({
      where: {
        _organizationCustomerPhoneNumber: args.phoneNumber,
        businessOutletId: args.businessOutletId
      }
    });
    return model;
  }

  public async create(
    dto: OrganizationCustomerFeedbackCreateRequest
  ): Promise<OrganizationCustomerFeedbackModel> {
    const newData: OrganizationCustomerFeedback = {
      _organizationCustomerName: dto.fullName,
      starRating: dto.starRating,
      tagPackaging: dto.tagPackaging,
      tagFoodQuality: dto.tagFoodQuality,
      tagTaste: dto.tagTaste,
      _organizationCustomerPhoneNumber: dto.phoneNumber,
      businessOutletId: dto.businessOutletId,
      tagPrice: dto.tagPrice,
      tagDeliveryTime: dto.tagDeliveryTime,
      tagComment: dto.tagComment,
      customerLat: dto.customerLat,
      customerLng: dto.customerLng,
      comment: dto.comment,
      organizationCustomerFeedbackMedias: [
        {
          category: OrganizationCustomerFeedbackMediaCategory.receipt,
          type: OrganizationCustomerFeedbackMediaType.image,
          url: dto.imageUrl
        }
      ]
    };

    const model = await this.organizationCustomerFeedbackModel.create<
      OrganizationCustomerFeedbackModel
    >(newData, {
      include: [OrganizationCustomerFeedbackMediaModel]
    });

    return model;
  }
}
