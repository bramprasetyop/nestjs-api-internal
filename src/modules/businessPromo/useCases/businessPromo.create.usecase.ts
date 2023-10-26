import {
  config,
  NotificationService,
  NotificationType,
  NotificationCategory
} from '@wahyoo/wahyoo-shared';
import { BusinessPromosStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import moment from 'moment';
import { BusinessPromo } from './../dto/businessPromo.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../commons/useCase.interface';
import { BusinessPromoCreateRequest } from '../dto/businessPromoCreateRequest.dto';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessPromoRepository } from '../repositories/businessPromo.repository';
import { OrganizationUserRepository } from '../../user/repositories/organizationUser.repository';
import { OrganizationUserBusinessOutletRepository } from '../../user/repositories/organizationUserBusinessOutlet.repository';
import { BusinessPromoMapper } from '../mappers/businessPromo.mapper';

@Injectable()
export class BusinessPromoCreateUseCase implements IUseCase {
  constructor(
    private readonly businessPromoRepository: BusinessPromoRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private readonly organizationUserBusinessOutletRepository: OrganizationUserBusinessOutletRepository,
    private readonly notificationService: NotificationService
  ) {}
  async execute(dto: BusinessPromoCreateRequest): Promise<BusinessPromo> {
    const {
      name,
      description,
      startDate,
      endDate,
      bannerImageUrl,
      businessId,
      createdBy,
      status
    } = dto;
    const isPublished = status === BusinessPromosStatus.published;
    dto.startDate = moment(startDate).format('YYYY-MM-DD');
    dto.endDate = moment(endDate).format('YYYY-MM-DD');

    const organization = await this.businessRepository.findById(businessId);
    if (!organization) {
      throw new NotFoundException(businessId);
    }

    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new NotFoundException(createdBy);
      }
      dto.createdBy = createdBy;
    }

    if (isPublished) {
      dto.publishedBy = createdBy;
      dto.publishedAt = new Date();
    }

    const businessPromoModel = await this.businessPromoRepository.create(dto);

    // send notification user
    if (isPublished) {
      const organizationUserBusinessOutlets = await this.organizationUserBusinessOutletRepository.findByBusinessIds(
        [businessId]
      );
      if (!organizationUserBusinessOutlets) {
        throw new NotFoundException(organizationUserBusinessOutlets);
      }

      const posUserIds = organizationUserBusinessOutlets.map(
        key => key.organizationUserId
      );

      await this.notificationService.sendNotificationToPosUser({
        title: '🎉 Promo Baru Tingkatkan Jualanmu!',
        isEmployee: false,
        actionLink: 'promotion-detail-view',
        description: `Maksimalkan Promo ${name} periode ${moment(
          startDate
        ).format('DD-MM-YYYY')} - ${moment(endDate).format('DD-MM-YYYY')}!`,
        actionData: JSON.stringify({ id: businessPromoModel.id }),
        type: NotificationType.TYPE_BROADCAST_PROMO,
        category: NotificationCategory.CATEGORY_PROMO,
        posUserIds,
        appId: config.notificationSvc.appId
      });
    }

    return BusinessPromoMapper.modelToDTO(businessPromoModel);
  }
}
