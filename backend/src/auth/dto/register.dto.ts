import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../../utilities/user/user.enums';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/[a-z]/, { message: 'Must include lowercase letter' })
  @Matches(/[A-Z]/, { message: 'Must include uppercase letter' })
  @Matches(/[0-9]/, { message: 'Must include number' })
  @Matches(/[^a-zA-Z0-9]/, { message: 'Must include special character' })
  password: string;

  @IsOptional()
  @IsString()
  instrument: string;

  @IsEnum(UserRole)
  role: UserRole;
}
