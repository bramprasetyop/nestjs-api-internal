import {
  config,
  NotificationService,
  NotificationType,
  NotificationCategory
} from '@wahyoo/wahyoo-shared';
import { BusinessPromosStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../commons/useCase.interface';
import { BusinessPromoRepository } from '../repositories/businessPromo.repository';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { OrganizationUserRepository } from '../../user/repositories/organizationUser.repository';
import { OrganizationUserBusinessOutletRepository } from '../../user/repositories/organizationUserBusinessOutlet.repository';
import { BusinessPromoMapper } from '../mappers/businessPromo.mapper';
import { BusinessPromo } from '../dto/businessPromo.dto';
import { BusinessPromoUpdateRequest } from '../dto/businessPromoUpdateRequest.dto';
import moment from 'moment';

@Injectable()
export class BusinessPromoUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessPromoRepository: BusinessPromoRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private readonly organizationUserBusinessOutletRepository: OrganizationUserBusinessOutletRepository,
    private readonly notificationService: NotificationService
  ) {}
  async execute(dto: BusinessPromoUpdateRequest): Promise<BusinessPromo> {
    const {
      id,
      name,
      description,
      startDate,
      endDate,
      bannerImageUrl,
      businessId,
      updatedBy,
      status
    } = dto;
    const isPublished = status === BusinessPromosStatus.published;
    dto.startDate = moment(startDate).format('YYYY-MM-DD');
    dto.endDate = moment(endDate).format('YYYY-MM-DD');

    const existingBusinessPromo = await this.businessPromoRepository.findById(
      id
    );
    if (!existingBusinessPromo) {
      throw new NotFoundException(id);
    }

    const organization = await this.businessRepository.findById(businessId);
    if (!organization) {
      throw new NotFoundException(businessId);
    }

    if (updatedBy) {
      const creator = await this.organizationUserRepository.findById(updatedBy);
      if (!creator) {
        throw new NotFoundException(updatedBy);
      }
      dto.updatedBy = updatedBy;
    }

    if (isPublished) {
      dto.publishedBy = updatedBy;
      dto.publishedAt = new Date();
    }

    const businessPromoModel = await this.businessPromoRepository.update(dto);

    // send notification user
    if (
      isPublished &&
      existingBusinessPromo.status !== BusinessPromosStatus.published
    ) {
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
        description: `Maksimalkan Promo ${name} periode ${moment(
          startDate
        ).format('DD-MM-YYYY')} - ${moment(endDate).format('DD-MM-YYYY')}!`,
        actionLink: 'promotion-detail-view',
        actionData: JSON.stringify({ id }),
        type: NotificationType.TYPE_BROADCAST_PROMO,
        category: NotificationCategory.CATEGORY_PROMO,
        posUserIds,
        appId: config.notificationSvc.appId
      });
    }
    return BusinessPromoMapper.modelToDTO(businessPromoModel);
  }
}
