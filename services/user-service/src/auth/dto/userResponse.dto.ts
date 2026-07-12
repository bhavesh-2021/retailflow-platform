export class UserResponseDto {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  accessToken!: string;
  refreshToken!: string;
  phoneNumber?: string;
}
