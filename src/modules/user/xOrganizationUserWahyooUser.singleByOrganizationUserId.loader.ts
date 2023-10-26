import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { XOrganizationUserWahyooUserModel } from '@wahyoo/wahyoo-shared';
import { XOrganizationUserWahyooUserRepository } from './repositories/xOrganizationUserWahyooUser.repository';
import { XOrganizationUserWahyooUserMapper } from './mappers/xOrganizationUserWahyooUser.mapper';
import { XOrganizationUserWahyooUser } from './dto/xOrganizationUserWahyooUser.dto';

@Injectable()
export class XOrganizationUserWahyooUserSingleByOrganizationUserIdLoader
  implements NestDataLoader<string, XOrganizationUserWahyooUser> {
  constructor(
    private readonly repository: XOrganizationUserWahyooUserRepository
  ) {}
  generateDataLoader(): DataLoader<string, XOrganizationUserWahyooUser> {
    return new DataLoader<string, XOrganizationUserWahyooUser>(async keys => {
      const xOrganizationUserWahyooUsers: XOrganizationUserWahyooUserModel[] = await this.repository.findByOrganizationUserIds(
        keys as string[]
      );
      const xOrganizationUserWahyooUserList = XOrganizationUserWahyooUserMapper.modelsToDTOs(
        xOrganizationUserWahyooUsers
      );
      return keys.map(key =>
        xOrganizationUserWahyooUserList.find(
          xOrganizationUserWahyooUser =>
            xOrganizationUserWahyooUser.organizationUserId === key
        )
      );
    });
  }
}
