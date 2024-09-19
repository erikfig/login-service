import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    try {
      const { sub } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const tokenDocument = await this.tokenService.findOne({ _id: sub });

      if (!tokenDocument) {
        throw new UnauthorizedException();
      }

      request['token'] = tokenDocument._id;
      request['user'] = tokenDocument.userId;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
