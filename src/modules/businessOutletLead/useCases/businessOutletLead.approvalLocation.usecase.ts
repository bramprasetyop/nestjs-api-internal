import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import {
  BusinessOutletLeadNotificationService,
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadRejectedReason,
  BusinessOutletLeadStatus,
  RabbitMQProducerService,
  RabbitMQTopicPubsubName
} from '@wahyoo/wahyoo-shared';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessOutletLead } from '../dto/businessOutletLead.dto';
import {
  BusinessOutletLeadApprovalLocationRequest,
  BusinessOutletLeadApprovalStatus
} from '../dto/businessOutletLeadApprovalLocationRequest.dto';
import { BusinessOutletLeadMapper } from '../mappers/businessOutletLead.mapper';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';
import { OrganizationBlacklistedUserRepository } from '../repositories/organizationBlacklistedUser.repository';

@Injectable()
export class BusinessOutletLeadApprovalLocationUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletLeadRepository,
    private readonly blackListedUserRepository: OrganizationBlacklistedUserRepository,
    private rabbitMQProducerService: RabbitMQProducerService,
    private businessOutletLeadNotification: BusinessOutletLeadNotificationService
  ) {}
  private currentUser: ICurrentUserArgs;

  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(
    dto: BusinessOutletLeadApprovalLocationRequest
  ): Promise<BusinessOutletLead> {
    const { businessOutletLeadId, notes = '-', status } = dto;
    const businessOutletLead = await this.repository.findById(
      businessOutletLeadId
    );
    if (!businessOutletLead) {
      throw new Error('business Outlet Lead Not Found');
    }

    if (businessOutletLead.status === BusinessOutletLeadStatus.rejected) {
      throw new Error('Your lead has been rejected');
    }

    if (
      businessOutletLead.ongoingStatus !== BusinessOutletLeadOngoingStatus.new
    ) {
      throw new Error(
        'Status before accepting or rejecting location must be "new"'
      );
    }

    let data = {
      status: null,
      ongoingStatus: BusinessOutletLeadOngoingStatus.new,
      rejectedReason: null,
      notes,
      updatedBy: this.currentUser.id
    };

    //check blacklistedUser
    const isBlacklistedUser = await this.blackListedUserRepository.isOrganizationBlacklistedUser(
      businessOutletLead.organizationUserId
    );
    if (isBlacklistedUser) {
      throw new Error('user has been black listed');
    }

    if (status === BusinessOutletLeadApprovalStatus.approved) {
      data.status = BusinessOutletLeadStatus.ongoing;
      data.ongoingStatus = BusinessOutletLeadOngoingStatus.location_approved;
    } else {
      data.status = BusinessOutletLeadStatus.rejected;
      data.rejectedReason = BusinessOutletLeadRejectedReason.location_rejected;
    }

    const updatedBusinessOutletLead = await this.repository.update(
      businessOutletLead,
      data
    );

    // send side effect to queue
    // due to onboarding revamp (nov 2022), the worker of this queue is empty
    // but still can be used in the future if needed
    // next step after location approval is scheduling survey
    // if (status === BusinessOutletLeadApprovalStatus.approved) {
    //   this.rabbitMQProducerService.publishToPubsub({
    //     topicPubsubName:
    //       RabbitMQTopicPubsubName.BUSINESS_OUTLET_LEAD_LOCATION_APPROVED_PUBSUB,
    //     data: {
    //       businessOutletLead: updatedBusinessOutletLead
    //     }
    //   });
    // }

    // send notification to organization user
    this.businessOutletLeadNotification.notifyUser(updatedBusinessOutletLead);
    return BusinessOutletLeadMapper.modelToDTO(updatedBusinessOutletLead);
  }
}
