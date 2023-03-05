import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.type';

@Injectable()
export class UsersService {
  // TODO Not safe, only for development & test purposes
  private readonly users: User[] = [
    {
      id: 'e42ad191-40b5-44b7-b630-17846032e70c',
      name: 'Lorem user',
      username: 'loremuser',
      password: 'pleasechangeme',
    },
    {
      id: 'aef0a6ab-9a33-4420-a8ab-70685ccedea5',
      name: 'Ipsum user',
      username: 'ipsumuser',
      password: 'pleasechangeme',
    },
  ];

  async findUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
