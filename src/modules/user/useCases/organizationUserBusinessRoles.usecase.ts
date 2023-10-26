import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';

const ORGANIZATION_USER_BUSINESS_ROLES = [
  'super_admin',
  'account_executive',
  'interview_team',
  'survey_team',
  'training_team',
  'ops_staff',
  'cro_wkp',
  'finance_staff'
];

@Injectable()
export class OrganizationUserBusinessRolesUseCase implements IUseCase {
  async execute(): Promise<string[]> {
    return new Promise(resolve => resolve(ORGANIZATION_USER_BUSINESS_ROLES));
  }
}
