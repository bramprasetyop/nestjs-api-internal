import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessOutletQualityControlStatus } from '@wahyoo/wahyoo-shared';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletQualityControl } from '../dto/businessOutletQualityControl.dto';
import { BusinessOutletQualityControlSubmitRequest } from '../dto/businessOutletQualityControlSubmitRequest.dto';
import { BusinessOutletQualityControlMapper } from '../mappers/businessOutletQualityControl.mapper';
import { BusinessOutletQualityControlRepository } from '../repositories/businessOutletQualityControl.repository';

@Injectable()
export class BusinessOutletQualityControlSubmitUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletQualityControlRepository
  ) {}

  private isQcResponseValid({ qcResponseJson, qcTemplateJson }): Boolean {
    for (let index = 0; index < qcTemplateJson.sections.length; index++) {
      const section = qcTemplateJson.sections[index];
      for (
        let sectionIdx = 0;
        sectionIdx < section.questions.length;
        sectionIdx++
      ) {
        const question = section.questions[sectionIdx];
        if (question.required) {
          if (!(question.key in qcResponseJson)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  async execute(
    dto: BusinessOutletQualityControlSubmitRequest
  ): Promise<BusinessOutletQualityControl> {
    const { id, qcResponseJson } = dto;
    const qualityControl = await this.repository.findById(id);
    if (!qualityControl) {
      throw new NotFoundException(id);
    }
    if (qualityControl.status !== BusinessOutletQualityControlStatus.new) {
      throw new Error('Form is expired');
    }
    const qcResponseJsonParsed = JSON.parse(qcResponseJson);
    if (
      !this.isQcResponseValid({
        qcResponseJson: qcResponseJsonParsed,
        qcTemplateJson: qualityControl._qcTemplateJson
      })
    ) {
      throw new Error('Response invalid');
    }

    const updatedBusinessOutletQualityControl = await this.repository.submit(
      dto
    );

    return BusinessOutletQualityControlMapper.modelToDTO(
      updatedBusinessOutletQualityControl
    );
  }
}
