import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthController } from './auth/auth.controller';
import { User, UserSchema } from './user/user.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { TokenService } from './token/token.service';
import { Token, TokenSchema } from './token/token.schema';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, TokenService, AuthGuard],
})
export class UsersModule {}
