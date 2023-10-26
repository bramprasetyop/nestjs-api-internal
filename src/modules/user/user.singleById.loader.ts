import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import {
  OrganizationModel,
  OrganizationUserModel
} from '@wahyoo/wahyoo-shared';
import { UserMapper } from './mappers/user.mapper';
import { OrganizationUser } from './dto/user.dto';
import { OrganizationUserRepository } from './repositories/organizationUser.repository';

@Injectable()
export class OrganizationUserSingleByIdLoader
  implements NestDataLoader<string, OrganizationUser> {
  constructor(private readonly repository: OrganizationUserRepository) {}
  generateDataLoader(): DataLoader<string, OrganizationUser> {
    return new DataLoader<string, OrganizationUser>(async keys => {
      const users: OrganizationUserModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const userList = UserMapper.modelsToDTOs(users);
      return keys.map(key => userList.find(user => user.id === key));
    });
  }
}
