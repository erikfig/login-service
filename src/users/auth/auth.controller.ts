import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthRequestDto } from './auth-request.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  @Get('me')
  public me(@Request() req) {
    return this.service.me(req.user);
  }

  @ApiResponse({ status: 200, description: 'Success.' })
  @Post('login')
  public login(@Body() data: AuthRequestDto) {
    return this.service.login(data);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  @Post('logout')
  public logout(@Request() req) {
    return this.service.logout(req.token);
  }
}
