import { Injectable } from '@nestjs/common';
import { User } from './entities/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];
    
    async create(userData: Partial<User>): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = { ...userData, password: hashedPassword } as User;
        this.users.push(newUser);
        return newUser;
    }
    
    async findByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
    
    async findAll(): Promise<User[]> {
        return this.users;
    }
}