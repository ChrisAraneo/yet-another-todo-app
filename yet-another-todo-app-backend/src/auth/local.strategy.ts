import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Status } from '../models/status.enum';
import { UserDetails } from '../models/user-details.type';
import { AuthService } from './services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDetails> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException({
        status: Status.Error,
        data: null,
        message: 'Unauthorized',
      });
    }

    return user;
  }
}
