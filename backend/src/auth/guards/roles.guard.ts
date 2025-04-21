import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../utilities/user/user.enums';
import { User } from 'src/user/entities/user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get required roles from the decorator metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 2. If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 3. Get the authenticated user from the request
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const { user } = request;
    console.log('request.user', user);
    // 4. If user doesn't exist or role is missing, deny access
    if (!user || !user.role) {
      throw new ForbiddenException('Access denied. Missing user role.');
    }

    // 5. Check if the user has at least one of the required roles
    const hasRole = requiredRoles.includes(user.role);
    console.log('hasRole', hasRole);
    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Requires role: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
