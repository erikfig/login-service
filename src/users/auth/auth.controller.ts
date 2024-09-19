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

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  public me(@Request() req) {
    return this.service.me(req.user);
  }

  @Post('login')
  public login(@Body() data: AuthRequestDto) {
    return this.service.login(data);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  public logout(@Request() req) {
    return this.service.logout(req.token);
  }
}
