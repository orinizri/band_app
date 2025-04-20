import { Injectable } from '@nestjs/common';
import { User } from './entities/user';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

interface createUserResponse {
  user?: User | null;
  users?: User[] | null;
  error?: string | null;
}

function createUserResponse(
  user: User | null = null,
  users: User[] | null = null,
  error: string | null = null,
): createUserResponse {
  return {
    user,
    users,
    error,
  };
}

@Injectable()
export class UserService {
  private users: User[] = [];

  async create(userData: RegisterDto): Promise<createUserResponse> {
    if (!userData.username || !userData.password)
      return createUserResponse(
        null,
        null,
        'Username and password are required',
      );
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = { ...userData, password: hashedPassword } as User;
    this.users.push(newUser);
    return createUserResponse(newUser);
  }

  findByUsername(username: string): createUserResponse {
    const user = this.users.find((user) => user.username === username);
    return createUserResponse(user, null, user ? null : 'User not found');
  }

  findAll(): createUserResponse {
    return createUserResponse(
      null,
      this.users,
      this.users ? null : 'User not found',
    );
  }
}
