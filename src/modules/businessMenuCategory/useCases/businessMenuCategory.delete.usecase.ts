import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { BusinessMenuItemRepository } from 'src/modules/businessMenuItem/repositories/businessMenuItem.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessMenuCategoryRepository } from '../repositories/businessMenuCategory.repository';
import {
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessMenuCategoryDeleteUseCase implements IUseCase {
  constructor(
    private readonly businessMenuCategoryRepository: BusinessMenuCategoryRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly businessMenuItemRepository: BusinessMenuItemRepository,
    private rabbitMQProducerService: RabbitMQProducerService
  ) {}
  async execute(id: string): Promise<boolean> {
    const businessMenuCategory = await this.businessMenuCategoryRepository.findById(
      id
    );
    if (!businessMenuCategory) {
      throw new NotFoundException(id);
    }

    const menuItems: any[] = await this.businessMenuItemRepository.findAllByMenuCategoryId(
      id
    );
    if (menuItems.length > 0) {
      const menuItemIds = menuItems.map(menuItem => menuItem.id);
      throw new Error(
        `Cannot delete menu category due to has folowing menu ids: ${menuItemIds.join(
          ', '
        )}`
      );
    }

    const isSuccessDelete = await this.businessMenuCategoryRepository.destroyById(
      id
    );
    // SEND TO RABBITMQ PUBSUB
    const businessModel = await this.businessRepository.findByBusinessMenuCategoryId(
      businessMenuCategory.id
    );
    this.rabbitMQProducerService.publishToPubsub({
      topicPubsubName: RabbitMQTopicPubsubName.BUSINESS_DATA_CHANGED_PUBSUB,
      data: {
        operation: 'delete',
        business: businessModel,
        businessMenuCategory
      }
    });

    return isSuccessDelete;
  }
}
