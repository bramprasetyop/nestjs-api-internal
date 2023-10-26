import { Inject } from '@nestjs/common';
import {
  InjectionKey,
  XOrganizationUserWahyooUserModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IXOrganizationUserWahyooUserRepository } from './xOrganizationUserWahyooUser.interface';

interface XOrganizationUserWahyooUserCreateArgs {
  xWahyooUserId: string;
  organizationUserId: string;
}

interface XOrganizationUserWahyooUserUpdateArgs
  extends XOrganizationUserWahyooUserCreateArgs {
  id: string;
}

interface XOrganizationUserWahyooUserDeleteArgs {
  xWahyooUserId: string;
  organizationUserId: string;
  id?: string;
}

export class XOrganizationUserWahyooUserRepository
  implements IXOrganizationUserWahyooUserRepository {
  constructor(
    @Inject(InjectionKey.X_ORGANIZATION_USER_WAHYOO_USER_MODEL)
    private readonly xOrganizationUserWahyooUserModel: typeof XOrganizationUserWahyooUserModel
  ) {}

  async findByOrganizationUserIds(
    ids: string[]
  ): Promise<XOrganizationUserWahyooUserModel[]> {
    return this.xOrganizationUserWahyooUserModel.findAll({
      where: {
        organizationUserId: {
          [Op.in]: ids
        }
      }
    });
  }

  async findOne(args: any): Promise<XOrganizationUserWahyooUserModel> {
    return this.xOrganizationUserWahyooUserModel.findOne({ where: args });
  }

  async findById(id: string): Promise<XOrganizationUserWahyooUserModel> {
    return this.xOrganizationUserWahyooUserModel.findByPk(id);
  }

  public async create(
    args: XOrganizationUserWahyooUserCreateArgs
  ): Promise<XOrganizationUserWahyooUserModel> {
    return this.xOrganizationUserWahyooUserModel.create({
      xWahyooUserId: args.xWahyooUserId,
      organizationUserId: args.organizationUserId
    });
  }

  public async update(
    dto: XOrganizationUserWahyooUserUpdateArgs
  ): Promise<XOrganizationUserWahyooUserModel> {
    const { id, ...args } = dto;
    const updatedResult = await this.findById(id);
    return await updatedResult.update(args);
  }

  public async delete(
    args: XOrganizationUserWahyooUserDeleteArgs
  ): Promise<Boolean> {
    const res = await this.xOrganizationUserWahyooUserModel.destroy({
      where: {
        id: args.id,
        xWahyooUserId: args.xWahyooUserId,
        organizationUserId: args.organizationUserId
      }
    });
    return res > 0;
  }
}
