import { Injectable } from '@nestjs/common';
import {
  config,
  BusinessOutletLeadModel,
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadStatus,
  DocusignService
} from '@wahyoo/wahyoo-shared';
import { IUseCase } from 'src/commons/useCase.interface';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessPropertyRepository } from 'src/modules/businessProperty/repositories/businessProperty.repository';
import { BusinessOutletLead } from '../dto/businessOutletLead.dto';
import { BusinessOutletLeadUpdateRequest } from '../dto/businessOutletLeadUpdateRequest.dto';
import { BusinessOutletLeadMapper } from '../mappers/businessOutletLead.mapper';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';
import moment from 'moment';

@Injectable()
export class BusinessOutletLeadUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessOutletLeadRepository: BusinessOutletLeadRepository,
    private readonly businessPropertyRepository: BusinessPropertyRepository,
    private readonly docusignService: DocusignService
  ) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  isAllowedUpdate(businessOutletLead: BusinessOutletLeadModel) {
    // due to onboarding revamp nov 2022, interview is not used. when deposit_paid, document is already sent to docusign
    const allowedOngoingStatusList = [
      BusinessOutletLeadOngoingStatus.new,
      BusinessOutletLeadOngoingStatus.location_approved,
      BusinessOutletLeadOngoingStatus.deposit_paid,
      BusinessOutletLeadOngoingStatus.survey_scheduled,
      BusinessOutletLeadOngoingStatus.survey_approved
    ];
    if (businessOutletLead.status === BusinessOutletLeadStatus.ongoing) {
      if (allowedOngoingStatusList.includes(businessOutletLead.ongoingStatus)) {
        return true;
      }
    }
    return false;
  }

  async execute(
    dto: BusinessOutletLeadUpdateRequest
  ): Promise<BusinessOutletLead> {
    const { id, ...input } = dto;

    let businessOutletLead = await this.businessOutletLeadRepository.findById(
      id
    );

    if (!businessOutletLead) {
      throw new Error('Outlet lead tidak ditemukan');
    }
    if (!this.isAllowedUpdate(businessOutletLead)) {
      throw new Error('Outlet lead ini sudah tidak dapat di update');
    }

    const businessOutletLeadModel = await this.businessOutletLeadRepository.update(
      businessOutletLead,
      input
    );

    if (
      businessOutletLeadModel.ongoingStatus ===
      BusinessOutletLeadOngoingStatus.deposit_paid
    ) {
      businessOutletLead = await this.businessOutletLeadRepository.findByIdWithInclude(
        id
      );
      const { xDocusignEnvelopId, businessId } = businessOutletLeadModel;
      const docusignEventJson = await this.docusignService.getEnvelope(
        xDocusignEnvelopId
      );

      const businessProperty = await this.businessPropertyRepository.findByBusinessId(
        businessId
      );
      let domicileAddress = `${businessOutletLead.ktpAddress}, ${businessOutletLead.ktpVillageName}, ${businessOutletLead.ktpDistrictName}, ${businessOutletLead.ktpCityName}, ${businessOutletLead.ktpProvinceName}`;
      if (
        businessOutletLead.domicileAddress &&
        businessOutletLead.domicileAddress !== ''
      ) {
        domicileAddress = businessOutletLead.domicileAddress;
      }
      const outletTermSheetAgreementCreatedAt = moment().format('DD-MM-YYYY');
      if (docusignEventJson.status === 'created') {
        const response = await this.docusignService.updateDocumentTab({
          templateId: businessProperty.xDocusignTemplateId,
          envelopeId: businessOutletLead.xDocusignEnvelopId,
          userEmail: businessOutletLead.organizationUser.email,
          userName: businessOutletLead.organizationUser.name,
          userKtpNo: businessOutletLead.ktpNumber,
          userKtpAddress: businessOutletLead.ktpAddress,
          userPhoneNumber: `+62${businessOutletLead.organizationUser.phoneNumber}`,
          userKtpVillageName: businessOutletLead.ktpVillageName,
          userKtpDistrictName: businessOutletLead.ktpDistrictName,
          userKtpCityName: businessOutletLead.ktpCityName,
          userKtpProvinceName: businessOutletLead.ktpProvinceName,
          userBankAccountProviderName:
            businessOutletLead.bankAccountProviderName,
          userBankAccountName: businessOutletLead.bankAccountName,
          userBankAccountNumber: businessOutletLead.bankAccountNumber,
          userDomicileAddress: domicileAddress,
          outletName: businessOutletLead.name,
          outletAddress: businessOutletLead.address,
          outletTermSheetAgreementNo:
            businessOutletLead.termSheetAgreementNumber,
          outletTermSheetAgreementCreatedAt,
          companyPicEmail: config.docusignConfig.defaultCcEmail,
          companyPicName: config.docusignConfig.defaultCcName
        });
        console.log(response);
      } else {
        throw Error(
          `can't update term sheet data on docusign due to already sent to user`
        );
      }
    }

    return BusinessOutletLeadMapper.modelToDTO(businessOutletLeadModel);
  }
}
