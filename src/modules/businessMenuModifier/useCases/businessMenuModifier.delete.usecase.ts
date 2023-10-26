import { Injectable, NotFoundException } from '@nestjs/common';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { BusinessMenuItemModifierRepository } from 'src/modules/businessMenuItem/repositories/businessMenuItemModifier.repository';
import { BusinessMenuModifierRepository } from '../repositories/businessMenuModifier.repository';

@Injectable()
export class BusinessMenuModifierDeleteUseCase implements IUseCase {
  constructor(
    private readonly businessMenuModifierRepository: BusinessMenuModifierRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly businessMenuItemModifierRepository: BusinessMenuItemModifierRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(id: string): Promise<Boolean> {
    const businessMenuModifierModel = await this.businessMenuModifierRepository.findById(
      id
    );
    if (!businessMenuModifierModel) {
      throw new NotFoundException(id);
    }

    const menuItemModifiers: any[] = await this.businessMenuItemModifierRepository.findByBusinessMenuModifierId(
      id
    );
    if (menuItemModifiers.length > 0) {
      const menuItemIds = menuItemModifiers.map(
        menuItemModifier => menuItemModifier.businessMenuItemId
      );
      throw new Error(
        `Cannot delete item modifier due to used by folowing menu ids: ${menuItemIds.join(
          ', '
        )}`
      );
    }

    const isSuccessDelete = await this.businessMenuModifierRepository.destroyById(
      id
    );

    // SEND TO RABBITMQ PUBSUB
    const businessModel = await this.businessRepository.findById(
      businessMenuModifierModel.businessId
    );
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'delete',
        business: businessModel,
        businessMenuModifier: businessMenuModifierModel
      }
    });

    return isSuccessDelete;
  }
}
