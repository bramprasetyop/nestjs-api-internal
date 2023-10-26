import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessMenuCategory } from '../dto/businessMenuCategory.dto';
import { BusinessMenuCategoryMapper } from '../mappers/businessMenuCategory.mapper';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessMenuCategoryRepository } from '../repositories/businessMenuCategory.repository';
import { BusinessMenuCategoryUpdateRequest } from '../dto/businessMenuCategoryUpdateRequest.dto';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessMenuCategoryUpdateUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessMenuCategoryRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(
    dto: BusinessMenuCategoryUpdateRequest
  ): Promise<BusinessMenuCategory> {
    const { id, parentId, businessId, createdBy } = dto;
    const businessMenuCategory = await this.repository.findById(id);
    if (!businessMenuCategory) {
      throw new NotFoundException(id);
    }
    const business = await this.businessRepository.findById(businessId);
    if (!business) {
      throw new NotFoundException(businessId);
    }
    if (parentId) {
      const parent = await this.repository.findById(parentId);
      if (!parent) {
        throw new NotFoundException(parentId);
      }
    }
    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new NotFoundException(createdBy);
      }
    }
    const businessMenuCategoryModel = await this.repository.update(dto);

    // SEND TO RABBITMQ PUBSUB
    const businessModel = await this.businessRepository.findById(businessId);
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'update',
        business: businessModel,
        businessMenuCategory: businessMenuCategoryModel
      }
    });

    return BusinessMenuCategoryMapper.modelToDTO(businessMenuCategoryModel);
  }
}
