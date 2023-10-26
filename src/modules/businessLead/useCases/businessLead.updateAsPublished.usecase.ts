import {
  config,
  NotificationService,
  NotificationType,
  NotificationCategory,
  RabbitMQQueueName,
  RabbitMQProducerService
} from '@wahyoo/wahyoo-shared';
import {
  BusinessLeadStatus,
  BusinessLeadRequirementStatus
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { some, isEmpty } from 'lodash';
import { IUseCase } from '../../../commons/useCase.interface';
import { BusinessLeadRepository } from '../repositories/businessLead.repository';
import { OrganizationUserRepository } from '../../user/repositories/organizationUser.repository';
import { BusinessLeadMapper } from '../mappers/businessLead.mapper';
import { BusinessLead } from '../dto/businessLead.dto';
import { BusinessLeadUpdateRequest } from '../dto/businessLeadUpdateRequest.dto';

@Injectable()
export class BusinessLeadUpdateAsPublishedUseCase implements IUseCase {
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    private readonly businessLeadRepository: BusinessLeadRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private readonly notificationService: NotificationService
  ) {}
  async execute(dto: BusinessLeadUpdateRequest): Promise<BusinessLead> {
    const { id, updatedBy, attachmentJson } = dto;
    const isRequirementStatusPartial = some(attachmentJson, ({ url }) =>
      isEmpty(url)
    );

    dto.requirementStatus = isRequirementStatusPartial
      ? BusinessLeadRequirementStatus.partial
      : BusinessLeadRequirementStatus.full;

    dto.status = BusinessLeadStatus.published;
    dto.publishedBy = updatedBy;

    let isNewPublished = false;

    const existingBusinessLead = await this.businessLeadRepository.findById(id);
    if (!existingBusinessLead) {
      throw new NotFoundException(id);
    }

    if (existingBusinessLead.status === BusinessLeadStatus.draft) {
      dto.publishedAt = new Date();
      isNewPublished = true;
    }

    if (
      existingBusinessLead.requirementStatus ===
        BusinessLeadRequirementStatus.partial &&
      dto.requirementStatus === BusinessLeadRequirementStatus.full
    ) {
      dto.publishedAt = new Date();
    }

    if (updatedBy) {
      const creator = await this.organizationUserRepository.findById(updatedBy);
      if (!creator) {
        throw new NotFoundException(updatedBy);
      }
      dto.updatedBy = creator.id;
      dto.organizationId = creator.organizationId;
    }

    const businessLeadModel = await this.businessLeadRepository.updateAsPublished(
      dto
    );

    await this.rabbitMQProducerService.publishToQueue({
      queueName:
        RabbitMQQueueName.POS_BUSINESS_LEAD_UPDATE_PUBLISHED_QUEUE_FIFO,
      data: {
        isNewPublished,
        businessLead: businessLeadModel
      }
    });

    // send notification user
    if (
      existingBusinessLead.requirementStatus !==
        BusinessLeadRequirementStatus.full &&
      dto.requirementStatus === BusinessLeadRequirementStatus.full
    ) {
      const organizationUserIds = await this.organizationUserRepository.getAllOrganizationUserIds();

      await this.notificationService.sendNotificationToPosUser({
        title: 'BARU di Wahyoo Kitchen Partner ‼️',
        isEmployee: false,
        description:
          'Untuk Anda yang ingin menambah penghasilan. Buruan cek info lengkapnya!',
        actionLink: 'business-information-view',
        actionData: JSON.stringify({ id }),
        type: NotificationType.TYPE_BROADCAST_INFO,
        category: NotificationCategory.CATEGORY_INFO,
        posUserIds: organizationUserIds.map(user => user.id),
        appId: config.notificationSvc.appId
      });
    }
    return BusinessLeadMapper.modelToDTO(businessLeadModel);
  }
}
