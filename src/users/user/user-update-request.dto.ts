import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserUpdateRequestDto {
  @ApiPropertyOptional({ default: 'Erik Figueiredo' })
  @IsString()
  @Transform(({ value }): string => (value as string).trim())
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ default: 'email@email.com' })
  @Transform(({ value }): string => (value as string).trim())
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ default: 'sje8@S2267' })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Transform(({ value }): string => (value as string).trim())
  @IsOptional()
  password?: string;
}
