import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    const { password, ...user } = await this.authService.register(body);

    return {
      message: "User Registered Successfully",
      data: user,
    }
  }

  @Post('/login')
  async login(): Promise<string> {
    return this.authService.login();
  }

  @Post('/refresh-token')
  async refreshToken(): Promise<string> {
    return this.authService.refreshToken();
  }

  @Post('/logout')
  async logout(): Promise<string> {
    return this.authService.logout();
  }
}
