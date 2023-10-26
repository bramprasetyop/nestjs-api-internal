import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuModifierCreateRequest } from '../dto/businessMenuModifierCreateRequest.dto';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessMenuModifierRepository } from '../repositories/businessMenuModifier.repository';
import { BusinessMenuModifierMapper } from '../mappers/businessMenuModifier.mapper';
import { BusinessMenuModifier } from '../dto/businessMenuModifier.dto';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessMenuModifierCreateUseCase implements IUseCase {
  constructor(
    private readonly businessMenuModifierRepository: BusinessMenuModifierRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(
    dto: BusinessMenuModifierCreateRequest
  ): Promise<BusinessMenuModifier> {
    const { businessId, createdBy } = dto;

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
    const businessMenuModifierModel = await this.businessMenuModifierRepository.create(
      dto
    );

    // SEND TO RABBITMQ PUBSUB
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'create',
        business: business,
        businessMenuModifier: businessMenuModifierModel
      }
    });

    return BusinessMenuModifierMapper.modelToDTO(businessMenuModifierModel);
  }
}
