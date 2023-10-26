import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletQualityControlRepository } from '../repositories/businessOutletQualityControl.repository';
import { BusinessOutletQualityControl } from '../dto/businessOutletQualityControl.dto';
import { BusinessOutletQualityControlStatus } from '@wahyoo/wahyoo-shared';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessOutletQualityControlMapper } from '../mappers/businessOutletQualityControl.mapper';

@Injectable()
export class BusinessOutletQualityControlMarksAsReviewedUseCase
  implements IUseCase {
  constructor(
    private readonly businessOutletQualityControlRepository: BusinessOutletQualityControlRepository
  ) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(id: string): Promise<BusinessOutletQualityControl> {
    const qualityControl = await this.businessOutletQualityControlRepository.findById(
      id
    );
    if (!qualityControl) {
      throw new NotFoundException(id);
    }
    const updatedBusinessOutletQualityControl = await this.businessOutletQualityControlRepository.markAsReviewed(
      {
        id,
        reviewedBy: this.currentUser.id
      }
    );

    return BusinessOutletQualityControlMapper.modelToDTO(
      updatedBusinessOutletQualityControl
    );
  }
}
