import { Test, TestingModule } from '@nestjs/testing';
import { User as UserSchema } from '@prisma/client';
import { UserInfo } from 'src/models/user-info.type';
import { DummyData } from '../../test/dummy-data';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

// TODO Delete User unit tests
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
            createUser: jest.fn(async (user: UserInfo): Promise<UserSchema> => {
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
            getUser: jest.fn(async (username: string): Promise<UserSchema> => {
              return new Promise<any | void>((resolve) => {
                if (username === DummyData.user.username) {
                  resolve({
                    ...DummyData.user,
                    password: 'this_is_password_hash',
                  });
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
      };

      expect(await service.createUser(newUser, 'Qwerty123/')).toEqual(newUser);
    });

    it('should throw error when user already exists', async () => {
      await expect(
        service.createUser(DummyData.user, DummyData.user.password),
      ).rejects.toThrow(Error);
    });
  });

  describe('findUser', () => {
    it('should return user when user was successfuly found', async () => {
      const user = {
        id: DummyData.user.id,
        name: DummyData.user.name,
        username: DummyData.user.username,
        passwordHash: 'this_is_password_hash',
      };

      expect(await service.findUser(DummyData.user.username)).toEqual(user);
    });

    it('should return undefined when user was not found', async () => {
      expect(await service.findUser('this_username_doesnt_exist')).toEqual(
        undefined,
      );
    });
  });
});
