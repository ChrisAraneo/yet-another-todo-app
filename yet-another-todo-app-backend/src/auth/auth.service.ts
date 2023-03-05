import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findUser(username);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }
}
