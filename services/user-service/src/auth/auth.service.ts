import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserRepository } from '../repositories';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../common/interfaces';

@Injectable()
export class AuthService {
  private readonly accessSecretKey = String(process.env.ACCESS_SECRET_KEY);
  private readonly refreshSecretKey = String(process.env.REFRESH_SECRET_KEY);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }

  private generateAccessToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: "15m",
      secret: this.accessSecretKey,
    });
  }

  private generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: "7d",
      secret: this.refreshSecretKey,
    });
  }

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

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Password is incorrect");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  refreshToken(): string {
    return 'Token refreshed successfully!';
  }

  logout(): string {
    return 'User logged out successfully!';
  }
}
