import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserCreateRequestDto } from './user-create-request.dto';
import { UserUpdateRequestDto } from './user-update-request.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  @Post()
  public create(@Body() data: UserCreateRequestDto) {
    return this.service.create(data);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  public update(@Param('id') id, @Body() data: UserUpdateRequestDto) {
    return this.service.update(id, data);
  }
}
