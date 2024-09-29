import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthRequestDto } from './auth-request.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async me(userId: string) {
    return this.userService.findOne({ _id: userId });
  }

  public async login(data: AuthRequestDto) {
    const user = await this.userService.findOne(
      { email: data.email },
      '+password',
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    if ((await this.comparePassword(data.password, user.password)) === false) {
      throw new UnauthorizedException();
    }

    const token = await this.tokenService.create({
      userId: user._id,
    });

    const payload = {
      sub: token._id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  public async logout(tokenId: string) {
    await this.tokenService.delete({ _id: tokenId });
    return {
      success: true,
    };
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await compare(password, hash);
  }
}
