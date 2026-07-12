import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { TokenPayload } from "../common/interfaces";
import { UserRepository } from "../repositories";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Access token not found');
    }

    const token = authHeader.substring(7);

    if (!token) {
      throw new UnauthorizedException("Token is not found");
    }

    try {
      const payload: TokenPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>("ACCESS_SECRET_KEY")
      });

      const user = await this.userRepository.findById(payload.id);

      if (!user) {
        throw new UnauthorizedException("Invalid or expired access token");
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired access token");
    }
  }
}
