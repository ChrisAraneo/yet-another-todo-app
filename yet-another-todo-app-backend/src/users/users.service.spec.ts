import { Test, TestingModule } from '@nestjs/testing';
import { DummyData } from '../../test/dummy-data';
import { User } from '../models/user.type';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

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
                if (user.username === DummyData.user.username) {
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
                if (username === DummyData.user.username) {
                  resolve(DummyData.user);
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
      await expect(service.createUser(DummyData.user)).rejects.toThrow(Error);
    });
  });

  describe('findUser', () => {
    it('should return user when user was successfuly found', async () => {
      expect(await service.findUser(DummyData.user.username)).toEqual(
        DummyData.user,
      );
    });

    it('should return undefined when user was not found', async () => {
      expect(await service.findUser('this_username_doesnt_exist')).toEqual(
        undefined,
      );
    });
  });
});
