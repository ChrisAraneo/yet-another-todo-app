import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findUser(username);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<string> {
    const payload = { id: user.id, username: user.username, name: user.name };

    return this.jwtService.sign(payload);
  }
}
