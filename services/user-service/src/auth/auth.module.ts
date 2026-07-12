import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RepositoriesModule } from '../repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [RepositoriesModule,
    JwtModule.register({
      global: true,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
