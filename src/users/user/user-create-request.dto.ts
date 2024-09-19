import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserCreateRequestDto {
  @ApiProperty({ default: 'Erik Figueiredo' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }): string => (value as string).trim())
  name: string;

  @ApiProperty({ default: 'email@email.com' })
  @Transform(({ value }): string => (value as string).trim())
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'sje8@S2267' })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Transform(({ value }): string => (value as string).trim())
  password: string;
}
