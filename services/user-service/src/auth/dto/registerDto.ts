import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(8, 100, { message: 'Password must be at least 8 characters long.' })
  @Matches(/\d/, { message: 'Password must contain at least one number.' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  @Matches(/[@$!%*?&^#]/, { message: 'Password must contain at least one special character.' })
  password!: string;

  @IsString()
  @Length(2, 100)
  firstName!: string;

  @IsString()
  @Length(2, 100)
  lastName!: string;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  phoneNumber?: string;
}
