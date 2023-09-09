import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { DummyData } from '../../../test/dummy-data';
import { UserDetails } from '../../models/user-details.type';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersModule } from '../../users/users.module';
import { UsersService } from '../../users/users.service';
import { LocalStrategy } from './../local.strategy';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule,
        ConfigModule,
        PrismaModule,
      ],
      providers: [
        AuthService,
        LocalStrategy,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => {
              return `notrealtoken`;
            }),
            decode: jest.fn((token) => {
              if (token === DummyData.user.refreshToken) {
                return {
                  username: DummyData.user.username,
                };
              } else if (token === 'bad_username') {
                return {
                  username: 'not_existing_user',
                };
              } else if (token === 'wrong_refresh_token_hash') {
                return {
                  username: 'wrong_refresh_token_hash',
                };
              }
            }),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {
            findUser: jest.fn(
              async (
                username: string,
              ): Promise<
                | (UserDetails & {
                    passwordHash: string;
                    refreshTokenHash: string;
                  })
                | undefined
              > => {
                if (username === DummyData.user.username) {
                  return {
                    id: DummyData.user.id,
                    name: DummyData.user.name,
                    username: DummyData.user.username,
                    passwordHash: await bcrypt.hash(
                      DummyData.user.password,
                      10,
                    ),
                    refreshTokenHash: await bcrypt.hash(
                      DummyData.user.refreshToken,
                      10,
                    ),
                  };
                } else if (username === 'wrong_refresh_token_hash') {
                  return {
                    id: '7cca428b-82c3-4dc4-94b8-863d831fae3c',
                    name: 'wrong_refresh_token_hash',
                    username: 'wrong_refresh_token_hash',
                    passwordHash: await bcrypt.hash('123', 10),
                    refreshTokenHash: await bcrypt.hash('456', 10),
                  };
                } else {
                  return null;
                }
              },
            ),
            updateRefreshToken: jest.fn(async (): Promise<UserDetails> => {
              return {
                id: DummyData.user.id,
                username: DummyData.user.username,
                name: DummyData.user.name,
                refreshToken: DummyData.user.refreshToken,
              };
            }),
          },
        },
      ],
      exports: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user when provided correct credentials', async () => {
      const user: UserDetails = {
        id: DummyData.user.id,
        name: DummyData.user.name,
        username: DummyData.user.username,
      };

      expect(
        await service.validateUser(
          DummyData.user.username,
          DummyData.user.password,
        ),
      ).toEqual(user);
    });

    it('should return null if non-existent username is provided', async () => {
      expect(
        await service.validateUser(
          'non_existend_username',
          DummyData.user.password,
        ),
      ).toEqual(null);
    });

    it('should return null if incorrect password is provided', async () => {
      expect(
        await service.validateUser(
          DummyData.user.username,
          'IcorrectPassw0rd123',
        ),
      ).toEqual(null);
    });
  });

  describe('login', () => {
    it('should return new tokens', async () => {
      expect(
        await service.login({
          id: DummyData.user.id,
          username: DummyData.user.username,
          name: DummyData.user.name,
        }),
      ).toEqual({
        accessToken: 'notrealtoken',
        refreshToken: 'notrealtoken',
      });
    });
  });

  describe('refreshTokens', () => {
    it('should return new tokens when provided valid refresh token', async () => {
      expect(await service.refreshTokens(DummyData.user.refreshToken)).toEqual({
        accessToken: 'notrealtoken',
        refreshToken: 'notrealtoken',
      });
    });

    it('should throw error when refresh token payload contains not existing username', async () => {
      await expect(service.refreshTokens('bad_username')).rejects.toThrow(
        Error,
      );
    });

    it('should throw error when comparision result of comparing token and hash is false', async () => {
      await expect(
        service.refreshTokens('wrong_refresh_token_hash'),
      ).rejects.toThrow(Error);
    });
  });
});
