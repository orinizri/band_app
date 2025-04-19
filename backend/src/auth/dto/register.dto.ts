import { IsString, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  instrument: string;

  @IsIn(['admin', 'player', 'singer'])
  role: 'admin' | 'player' | 'singer';
}
