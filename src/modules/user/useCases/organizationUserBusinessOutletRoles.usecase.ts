import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';

const ORGANIZATION_USER_BUSINESS_OUTLET_ROLES = ['outlet_owner'];

@Injectable()
export class OrganizationUserBusinessOutletRolesUseCase implements IUseCase {
  async execute(): Promise<string[]> {
    return new Promise(resolve =>
      resolve(ORGANIZATION_USER_BUSINESS_OUTLET_ROLES)
    );
  }
}
