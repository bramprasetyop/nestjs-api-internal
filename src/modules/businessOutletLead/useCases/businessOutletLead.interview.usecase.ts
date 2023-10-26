import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import {
  BusinessOutletLeadNotificationService,
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadStatus
} from '@wahyoo/wahyoo-shared';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessOutletLead } from '../dto/businessOutletLead.dto';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';
import { OrganizationBlacklistedUserRepository } from '../repositories/organizationBlacklistedUser.repository';
import { BusinessOutletLeadInterviewRequest } from '../dto/businessOutletLeadInterviewRequest.dto';
import { BusinessOutletLeadMapper } from '../mappers/businessOutletLead.mapper';

// THIS API IS DEPRECATED SINCE NEW ONBOARDING FLOW (NOV 2022)
@Injectable()
export class BusinessOutletLeadInterviewUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletLeadRepository,
    private readonly blackListedUserRepository: OrganizationBlacklistedUserRepository,
    private businessOutletLeadNotification: BusinessOutletLeadNotificationService
  ) {}
  private currentUser: ICurrentUserArgs;

  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(
    dto: BusinessOutletLeadInterviewRequest
  ): Promise<BusinessOutletLead> {
    const { businessOutletLeadId, interviewSchedule, interviewMeetUrl } = dto;
    let businessOutletLead = await this.repository.findById(
      businessOutletLeadId
    );
    if (!businessOutletLead) {
      throw new Error('business Outlet Lead Not Found');
    }

    if (businessOutletLead.status === BusinessOutletLeadStatus.rejected) {
      throw new Error('Your lead has been rejected');
    }

    if (
      !(
        businessOutletLead.ongoingStatus ===
          BusinessOutletLeadOngoingStatus.deposit_paid ||
        businessOutletLead.ongoingStatus ===
          BusinessOutletLeadOngoingStatus.interview_scheduled
      )
    ) {
      throw new Error(
        'Status before scheduling interview must be "deposit_paid" or "interview_scheduled"'
      );
    }

    let data = {
      status: BusinessOutletLeadStatus.ongoing,
      ongoingStatus: BusinessOutletLeadOngoingStatus.interview_scheduled,
      interviewSchedule,
      interviewMeetUrl,
      updatedBy: this.currentUser.id
    };

    //check blacklistedUser
    const isBlacklistedUser = await this.blackListedUserRepository.isOrganizationBlacklistedUser(
      businessOutletLead.organizationUserId
    );
    if (isBlacklistedUser) {
      throw new Error('user has been black listed');
    }

    const updatedBusinessOutletLead = await this.repository.update(
      businessOutletLead,
      data
    );

    //send notif to organization user
    this.businessOutletLeadNotification.notifyUser(updatedBusinessOutletLead);
    return BusinessOutletLeadMapper.modelToDTO(updatedBusinessOutletLead);
  }
}
