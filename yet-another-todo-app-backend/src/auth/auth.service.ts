import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDetails } from '../models/user-details.type';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findUser(username);

    if (!!user && !!password) {
      let isValid = false;

      try {
        isValid = await bcrypt.compare(password, user.passwordHash);
      } catch (error) {
        isValid = false;
      }

      if (isValid) {
        return { id: user.id, name: user.name, username: user.username };
      }
    }

    return null;
  }

  async login(user: UserDetails): Promise<string> {
    const payload = { id: user.id, username: user.username, name: user.name };

    return this.jwtService.sign(payload);
  }
}
