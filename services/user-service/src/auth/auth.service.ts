import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto';
import { UserRepository } from '../repositories';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) { }

  async register(dto: RegisterDto) {
    const exitingUser = await this.userRepository.findByEmail(dto.email);

    if (exitingUser) {
      throw new ConflictException("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    return this.userRepository.saveUser({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
    });
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
