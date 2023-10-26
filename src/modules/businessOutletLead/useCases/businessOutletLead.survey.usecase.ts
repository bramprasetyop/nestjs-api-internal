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
import { BusinessOutletLeadSurveyRequest } from '../dto/businessOutletLeadSurveyRequest.dto';
import { BusinessOutletLeadMapper } from '../mappers/businessOutletLead.mapper';

@Injectable()
export class BusinessOutletLeadSurveyUseCase implements IUseCase {
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
    dto: BusinessOutletLeadSurveyRequest
  ): Promise<BusinessOutletLead> {
    const { businessOutletLeadId, surveySchedule } = dto;
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
          BusinessOutletLeadOngoingStatus.location_approved ||
        businessOutletLead.ongoingStatus ===
          BusinessOutletLeadOngoingStatus.survey_scheduled
      )
    ) {
      throw new Error(
        'Status before scheduling survey must be "location_approved" or "survey_scheduled"'
      );
    }

    let data = {
      status: BusinessOutletLeadStatus.ongoing,
      ongoingStatus: BusinessOutletLeadOngoingStatus.survey_scheduled,
      surveySchedule,
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
