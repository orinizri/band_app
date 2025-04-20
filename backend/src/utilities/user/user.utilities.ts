import { UserRole } from '../user/user.enums';

/**
 * Determines the role to assign during registration.
 * - If explicitly "admin", returns UserRole.ADMIN
 * - If explicitly "singer", returns UserRole.SINGER
 * - Otherwise defaults to UserRole.PLAYER
 */
export function resolveUserRole(input?: string): UserRole {
  switch (input?.toLowerCase()) {
    case UserRole.ADMIN:
      return UserRole.ADMIN;
    case UserRole.SINGER:
      return UserRole.SINGER;
    default:
      return UserRole.PLAYER;
  }
}
