import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDto {
  @Transform(({ value }): string => (value as string).trim())
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }): string => (value as string).trim())
  password: string;
}
