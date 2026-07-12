import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto, UserResponseDto } from './dto';
import { UserRepository } from '../repositories';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../common/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  private generateAccessToken(payload: TokenPayload) {
    const secret = this.configService.getOrThrow<string>('ACCESS_SECRET_KEY');

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: "15m"
    });
  }

  private generateRefreshToken(payload: TokenPayload) {
    const secret = this.configService.getOrThrow<string>('REFRESH_SECRET_KEY');

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: "7d"
    });
  }

  async register(dto: RegisterDto): Promise<UserResponseDto> {
    const exitingUser = await this.userRepository.findByEmail(dto.email);

    if (exitingUser) {
      throw new ConflictException("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.userRepository.saveUser({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
    });

    const payload = {
      id: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      accessToken,
      refreshToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
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

  refreshToken(payload?: TokenPayload | null) {
    if (!payload) {
      throw new UnauthorizedException()
    }
    return this.generateAccessToken(payload);
  }

  logout(): string {
    return 'User logged out successfully!';
  }
}
