import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { DummyData } from '../../test/dummy-data';
import { UserDetails } from '../models/user-details.type';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

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
                (UserDetails & { passwordHash: string }) | undefined
              > => {
                return username === DummyData.user.username
                  ? {
                      id: DummyData.user.id,
                      name: DummyData.user.name,
                      username: DummyData.user.username,
                      passwordHash: await bcrypt.hash(
                        DummyData.user.password,
                        10,
                      ),
                    }
                  : null;
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
});
