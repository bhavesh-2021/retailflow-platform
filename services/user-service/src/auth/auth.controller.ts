import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async register(): Promise<string> {
    return this.authService.register();
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
