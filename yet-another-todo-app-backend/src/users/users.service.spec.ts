import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/models/user.type';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const dummyExistingUser: User = {
    id: '961d2c4d-8042-43a6-9a25-78d733094837',
    name: 'Lorem',
    username: 'lorem_ipsum',
    password: 'Qwerty123/',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            createUser: jest.fn(async (user: User): Promise<User> => {
              return new Promise<any>((resolve, reject) => {
                if (user.username === dummyExistingUser.username) {
                  reject({
                    meta: {
                      target: ['username'],
                    },
                  });
                } else {
                  resolve(user);
                }
              });
            }),
            getUser: jest.fn(async (username: string): Promise<User> => {
              return new Promise<any | void>((resolve) => {
                if (username === dummyExistingUser.username) {
                  resolve(dummyExistingUser);
                } else {
                  resolve(undefined);
                }
              });
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should return user when user was successfuly created', async () => {
      const newUser = {
        id: '7f83b4eb-336c-4f9c-b17a-bbe46d2526df',
        name: 'New user',
        username: 'new_user',
        password: 'Qwerty123/',
      };

      expect(await service.createUser(newUser)).toEqual(newUser);
    });

    it('should throw error when user already exists', async () => {
      await expect(service.createUser(dummyExistingUser)).rejects.toThrow(
        Error,
      );
    });
  });

  describe('findUser', () => {
    it('should return user when user was successfuly found', async () => {
      expect(await service.findUser(dummyExistingUser.username)).toEqual(
        dummyExistingUser,
      );
    });

    it('should return undefined when user was not found', async () => {
      expect(await service.findUser('this_username_doesnt_exist')).toEqual(
        undefined,
      );
    });
  });
});
