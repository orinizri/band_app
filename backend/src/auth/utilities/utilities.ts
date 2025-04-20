import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user';
import { AuthResponse } from '../types/auth-response';

export const generateAuthResponse = (
  user: User,
  jwtService: JwtService,
): AuthResponse => {
  const token = jwtService.sign({
    sub: user.id,
    username: user.username,
    role: user.role,
  });

  return {
    user: {
      username: user.username,
      instrument: user.instrument,
      role: user.role,
    },
    token,
  };
};

export const generateErrorResponse = (error: string | null): AuthResponse => {
  return {
    user: null,
    token: null,
    error: error,
  };
};
