import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserUpdateRequestDto {
  @IsString()
  @Transform(({ value }): string => (value as string).trim())
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Transform(({ value }): string => (value as string).trim())
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Transform(({ value }): string => (value as string).trim())
  @IsOptional()
  password?: string;
}
