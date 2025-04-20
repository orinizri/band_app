import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './types/auth-response';
import {
  generateAuthResponse,
  generateErrorResponse,
} from './utilities/utilities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<AuthResponse> {
    try {
      // Check if the user already exists
      const existing = await this.userService.findByUsername(data.username);
      if (existing) return generateErrorResponse('Username is already taken');
      // Hash the password and create the user
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.userService.create({
        ...data,
        password: hashedPassword,
      });
      // Sign in and generate JWT token
      return generateAuthResponse(user, this.jwtService);
    } catch (err) {
      console.error('Registration error:', err);
      return generateErrorResponse('Registration failed');
    }
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      // Check if the user exists
      const user = await this.userService.findByUsername(username);
      if (!user) return generateErrorResponse('User not found');
      // Check if the password is correct
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) return generateErrorResponse('Invalid password');
      // Sign in and generate JWT token
      return generateAuthResponse(user, this.jwtService);
    } catch (err) {
      console.error('Login error:', err);
      return generateErrorResponse('Login failed');
    }
  }
}
