import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }): string => (value as string).trim())
  name: string;

  @Transform(({ value }): string => (value as string).trim())
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Transform(({ value }): string => (value as string).trim())
  password: string;
}
