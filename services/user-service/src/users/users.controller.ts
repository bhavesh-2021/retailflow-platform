import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '../guard';

@UseGuards(AuthGuard)
@Controller('/user')
export class UsersController {

  @Get('/profile')
  userProfile(@Req() req: Request) {
    const currentUser = req.user;

    if (!currentUser) {
      throw new UnauthorizedException()
    }

    return {
      message: "User profile fetched successfully",
      data: {
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phoneNumber: currentUser.phoneNumber,
        status: currentUser.status,
        createdAt: currentUser.createdAt,
        updateAt: currentUser.updatedAt
      }
    }
  }
}
