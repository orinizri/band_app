import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Public()
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data.username, data.password);
  }
}
