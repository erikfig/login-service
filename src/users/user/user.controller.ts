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

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(@Body() data: UserCreateRequestDto) {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  public update(@Param('id') id, @Body() data: UserUpdateRequestDto) {
    return this.service.update(id, data);
  }
}
