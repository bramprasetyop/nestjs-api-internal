import { IUseCase } from 'src/commons/useCase.interface';
import { Op, Transaction } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import {
  BusinessOutletLeadLogModel,
  BusinessOutletLeadModel,
  BusinessOutletLeadNotificationService,
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadStatus,
  DocusignService,
  EnvelopeStatus,
  InjectionKey,
  RabbitMQProducerService,
  RabbitMQQueueName,
  SignerStatus
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class PublishDocusignCallbackUseCase implements IUseCase {
  constructor(
    private rabbitMQProducerService: RabbitMQProducerService,
    private businessOutletLeadNotification: BusinessOutletLeadNotificationService,
    private readonly docusignService: DocusignService,
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MODEL)
    private readonly businessOutletLeadModel: typeof BusinessOutletLeadModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_LOG_MODEL)
    private readonly businessOutletLeadLogModel: typeof BusinessOutletLeadLogModel
  ) {}

  async execute() {
    try {
      const businessOutletLeads = await this.businessOutletLeadModel.findAll({
        where: {
          status: BusinessOutletLeadStatus.ongoing,
          ongoingStatus: {
            [Op.in]: [
              BusinessOutletLeadOngoingStatus.deposit_paid,
              BusinessOutletLeadOngoingStatus.term_sent
            ]
          },
          xDocusignEnvelopId: {
            [Op.ne]: '' // pass empty string also support null value
          },
          businessOutletId: {
            [Op.is]: null
          }
        }
      });

      console.log('businessOutletLeads.length :', businessOutletLeads.length);
      for (let i = 0; i < businessOutletLeads.length; i++) {
        const businessOutletLead = businessOutletLeads[i];
        const { xDocusignEnvelopId } = businessOutletLead;
        let docusignEventJson = null;
        try {
          docusignEventJson = await this.docusignService.getEnvelope(
            xDocusignEnvelopId
          );
        } catch (err) {
          console.error(err);
        }

        if (!docusignEventJson) {
          continue;
        }
        const { signers } = docusignEventJson.recipients;
        const signer = signers.find(signer => signer.roleName === 'user');

        if (
          businessOutletLead.ongoingStatus ===
            BusinessOutletLeadOngoingStatus.deposit_paid &&
          docusignEventJson.status === EnvelopeStatus.SENT
        ) {
          let transaction: Transaction = null;
          try {
            transaction = await this.businessOutletLeadModel.sequelize.transaction();

            const updatedBusinessOutletLead = await businessOutletLead.update(
              {
                ongoingStatus: BusinessOutletLeadOngoingStatus.term_sent
              },
              { transaction }
            );

            await this.businessOutletLeadLogModel.create(
              {
                businessOutletLeadId: updatedBusinessOutletLead.id,
                name: updatedBusinessOutletLead.name,
                status: updatedBusinessOutletLead.status,
                ongoingStatus: updatedBusinessOutletLead.ongoingStatus,
                rejectedReason: updatedBusinessOutletLead.rejectedReason,
                interviewSchedule: updatedBusinessOutletLead.interviewSchedule,
                surveySchedule: updatedBusinessOutletLead.surveySchedule,
                trainingSchedule: updatedBusinessOutletLead.trainingSchedule,
                expiredSchedule: updatedBusinessOutletLead.expiredSchedule
              },
              { transaction }
            );
            await transaction.commit();

            //send notification to admin
            this.businessOutletLeadNotification.notifyUser(
              updatedBusinessOutletLead
            );
          } catch (err) {
            console.log(err);
            if (transaction) await transaction.rollback();
            throw err;
          }
        }

        if (
          docusignEventJson.status === EnvelopeStatus.COMPLETED ||
          signer.status === SignerStatus.COMPLETED
        ) {
          console.log(JSON.stringify(docusignEventJson));
          await this.rabbitMQProducerService.publishToQueue({
            queueName: RabbitMQQueueName.DOCUSIGN_EVENT_FIFO,
            data: docusignEventJson
          });
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
