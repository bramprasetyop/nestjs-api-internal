import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { OrganizationUserRepository } from './repositories/organizationUser.repository';
import { config, roleAndPermission } from '@wahyoo/wahyoo-shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: OrganizationUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSessionSecret
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const user = await this.userRepository.findById({
      id
    });
    if (!user) {
      throw new Error('user not found');
    }

    const businessOutletIdSet = new Set();
    const businessIdSet = new Set();
    const roleSet = new Set();
    const businessPermissionSet = new Set();
    const outletPermissionSet = new Set();
    const permissionSet = new Set();
    let organizationLevel = 2;
    if (user.organizationUserBusinesses.length > 0) {
      user.organizationUserBusinesses.forEach(
        organizationUserBusinessesRoles => {
          organizationUserBusinessesRoles.roles.forEach(role => {
            roleSet.add(role);
            organizationLevel = 1;
            const index = roleAndPermission.map(e => e.role).indexOf(role);
            if (index >= 0) {
              roleAndPermission[index].permissions.forEach(permission => {
                businessPermissionSet.add(permission);
              });
            }
          });
          businessIdSet.add(organizationUserBusinessesRoles.businessId);
        }
      );
    }
    if (user.organizationUserBusinessOutlets.length > 0) {
      user.organizationUserBusinessOutlets.forEach(
        organizationUserBusinessOutlet => {
          organizationUserBusinessOutlet.roles.forEach(role => {
            roleSet.add(role);
            const index = roleAndPermission.map(e => e.role).indexOf(role);
            if (index >= 0) {
              roleAndPermission[index].permissions.forEach(permission => {
                outletPermissionSet.add(permission);
              });
            }
          });
          businessOutletIdSet.add(
            organizationUserBusinessOutlet.businessOutletId
          );
          if (organizationUserBusinessOutlet.businessOutlet) {
            const { businessOutlet } = organizationUserBusinessOutlet;
            businessIdSet.add(businessOutlet.businessId);
          }
        }
      );
    }

    const roles: any[] = Array.from(roleSet) || [];
    if (roles.length > 0 && roleAndPermission) {
      roles.forEach(role => {
        const index = roleAndPermission.map(e => e.role).indexOf(role);
        if (index >= 0) {
          roleAndPermission[index].permissions.forEach(permission => {
            permissionSet.add(permission);
          });
        }
      });
    }

    const currentUser = {
      id: user.id,
      roles,
      organizationLevel,
      businessPermissions: Array.from(businessPermissionSet) || [],
      outletPermissions: Array.from(outletPermissionSet) || [],
      permissions: Array.from(permissionSet) || [],
      organizationId: user.organizationId,
      businessIds: Array.from(businessIdSet) || [],
      businessOutletIds: Array.from(businessOutletIdSet) || []
    };
    return currentUser;
  }
}
