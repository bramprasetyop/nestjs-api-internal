import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuItem } from '../dto/businessMenuItem.dto';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { BusinessMenuItemMapper } from '../mappers/businessMenuItem.mapper';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { BusinessMenuItemRepository } from '../repositories/businessMenuItem.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessMenuItemCreateRequest } from '../dto/businessMenuItemCreateRequest.dto';
import { BusinessMenuCategoryRepository } from 'src/modules/businessMenuCategory/repositories/businessMenuCategory.repository';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessMenuItemCreateUseCase implements IUseCase {
  constructor(
    private readonly businessMenuItemRepository: BusinessMenuItemRepository,
    private readonly businessMenuCategoryRepository: BusinessMenuCategoryRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private readonly businessRepository: BusinessRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(dto: BusinessMenuItemCreateRequest): Promise<BusinessMenuItem> {
    const { businessMenuCategoryId, createdBy, businessId } = dto;
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
    const businessMenuItemModel = await this.businessMenuItemRepository.create(
      dto
    );

    // SEND TO RABBITMQ PUBSUB
    const businessModel = await this.businessRepository.findByBusinessMenuItemId(
      businessMenuItemModel.id
    );
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'create',
        business: businessModel,
        businessMenuItem: businessMenuItemModel
      }
    });
    return BusinessMenuItemMapper.modelToDTO(businessMenuItemModel);
  }
}
