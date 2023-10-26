import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );
    if (!permissions) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    const matchPermissions = () =>
      permissions.every(permission => user.permissions.includes(permission));

    return matchPermissions();
  }
}
