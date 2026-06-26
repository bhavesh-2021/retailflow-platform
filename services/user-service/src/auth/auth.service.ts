import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register(): string {
    return 'User registered successfully!';
  }

  login(): string {
    return 'User logged in successfully!';
  }

  refreshToken(): string {
    return 'Token refreshed successfully!';
  }

  logout(): string {
    return 'User logged out successfully!';
  }
}
