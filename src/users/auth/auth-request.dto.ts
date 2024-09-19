import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDto {
  @ApiProperty({ default: 'email@email.com' })
  @Transform(({ value }): string => (value as string).trim())
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'sje8@S2267' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }): string => (value as string).trim())
  password: string;
}
