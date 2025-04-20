import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user';
import { AuthResponse } from '../types/auth-response';

export const generateAuthResponse = (
  user: User,
  jwtService: JwtService,
): AuthResponse => {
  const userPayload = {
    username: user.username,
    instrument: user.instrument,
    role: user.role,
  };
  const token = jwtService.sign({ ...userPayload, sub: user.id });

  return {
    user: {
      id: user.id,
      ...userPayload,
    },
    token,
    error: null,
  };
};

export const generateErrorResponse = (error: string | null): AuthResponse => {
  return {
    user: null,
    token: null,
    error: error,
  };
};
