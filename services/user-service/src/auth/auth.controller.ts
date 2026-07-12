import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import type { Response } from 'express';

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
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(body);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: "User Login Successfully",
      accessToken: tokens.accessToken
    };
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
