import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuModifierRepository } from '../repositories/businessMenuModifier.repository';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessMenuModifierMapper } from '../mappers/businessMenuModifier.mapper';
import { BusinessMenuModifier } from '../dto/businessMenuModifier.dto';
import { BusinessMenuModifierUpdateRequest } from '../dto/businessMenuModifierUpdateRequest.dto';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessMenuModifierUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessMenuModifierRepository: BusinessMenuModifierRepository,
    private readonly BusinessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(
    dto: BusinessMenuModifierUpdateRequest
  ): Promise<BusinessMenuModifier> {
    const { id, businessId, createdBy } = dto;
    const businessMenuModifierModel = await this.businessMenuModifierRepository.findById(
      id
    );
    if (!businessMenuModifierModel) {
      throw new NotFoundException(id);
    }

    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new NotFoundException(createdBy);
      }
    }

    const business = await this.BusinessRepository.findById(businessId);
    if (!business) {
      throw new NotFoundException(businessId);
    }
    const updatedBusinessMenuModifier = await this.businessMenuModifierRepository.update(
      dto
    );

    // SEND TO RABBITMQ PUBSUB
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'update',
        business: business,
        businessMenuModifier: businessMenuModifierModel
      }
    });

    return BusinessMenuModifierMapper.modelToDTO(updatedBusinessMenuModifier);
  }
}
