import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessMenuCategory } from '../dto/businessMenuCategory.dto';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { BusinessMenuCategoryMapper } from '../mappers/businessMenuCategory.mapper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessMenuCategoryRepository } from '../repositories/businessMenuCategory.repository';
import { BusinessMenuCategoryCreateRequest } from '../dto/businessMenuCategoryCreateRequest.dto';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessMenuCategoryCreateUseCase implements IUseCase {
  constructor(
    private readonly businessMenuCategoryRepository: BusinessMenuCategoryRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(
    dto: BusinessMenuCategoryCreateRequest
  ): Promise<BusinessMenuCategory> {
    const { parentId, businessId, createdBy } = dto;
    const business = await this.businessRepository.findById(businessId);
    if (!business) {
      throw new NotFoundException(businessId);
    }
    if (parentId) {
      const parent = await this.businessMenuCategoryRepository.findById(
        parentId
      );
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
    const businessMenuCategoryModel = await this.businessMenuCategoryRepository.create(
      dto
    );

    // SEND TO RABBITMQ PUBSUB
    const businessModel = await this.businessRepository.findById(businessId);
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'create',
        business: businessModel,
        businessMenuCategory: businessMenuCategoryModel
      }
    });

    return BusinessMenuCategoryMapper.modelToDTO(businessMenuCategoryModel);
  }
}
