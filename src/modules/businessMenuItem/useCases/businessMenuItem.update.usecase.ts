import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuItemRepository } from '../repositories/businessMenuItem.repository';
import { BusinessMenuItemMapper } from '../mappers/businessMenuItem.mapper';
import { BusinessMenuItem } from '../dto/businessMenuItem.dto';
import { BusinessMenuItemUpdateRequest } from '../dto/businessMenuItemUpdateRequest.dto';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessMenuCategoryRepository } from 'src/modules/businessMenuCategory/repositories/businessMenuCategory.repository';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessMenuItemUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessMenuItemRepository: BusinessMenuItemRepository,
    private readonly businessMenuCategoryRepository: BusinessMenuCategoryRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private readonly businessRepository: BusinessRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(dto: BusinessMenuItemUpdateRequest): Promise<BusinessMenuItem> {
    const { id, businessMenuCategoryId, createdBy, businessId } = dto;
    const businessMenuItem = await this.businessMenuItemRepository.findById(id);
    if (!businessMenuItem) {
      throw new NotFoundException(id);
    }

    const category = await this.businessMenuCategoryRepository.findById(
      businessMenuCategoryId
    );
    if (!category) {
      throw new NotFoundException(businessMenuCategoryId);
    }

    const business = await this.businessRepository.findById(businessId);
    if (!business) {
      throw new NotFoundException(businessId);
    }

    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new NotFoundException(createdBy);
      }
    }
    const businessMenuItemModel = await this.businessMenuItemRepository.update(
      dto
    );

    // SEND TO RABBITMQ PUBSUB
    const businessModel = await this.businessRepository.findByBusinessMenuItemId(
      businessMenuItem.id
    );
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'update',
        business: businessModel,
        businessMenuItem: businessMenuItemModel
      }
    });
    return BusinessMenuItemMapper.modelToDTO(businessMenuItemModel);
  }
}
