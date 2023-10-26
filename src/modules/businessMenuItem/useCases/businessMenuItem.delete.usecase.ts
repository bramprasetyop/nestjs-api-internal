import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { BusinessMenuItemRepository } from '../repositories/businessMenuItem.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessMenuItemDeleteUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessMenuItemRepository,
    private readonly businessRepository: BusinessRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(id: string): Promise<boolean> {
    const businessMenuItem = await this.repository.findById(id);
    if (!businessMenuItem) {
      throw new NotFoundException(id);
    }

    const isSuccessDelete = await this.repository.destroyById(id);

    // SEND TO RABBITMQ PUBSUB
    const businessModel = await this.businessRepository.findByBusinessMenuItemId(
      businessMenuItem.id
    );
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'delete',
        business: businessModel,
        businessMenuItem
      }
    });
    return isSuccessDelete;
  }
}
