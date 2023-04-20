import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { DummyData } from '../../test/dummy-data';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, PassportModule, PrismaModule],
      providers: [
        AuthService,
        LocalStrategy,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(async (payload: any) => {
              return `notrealtoken${JSON.stringify(payload)}`;
            }),
          },
        },
        {
          provide: JwtStrategy,
          useValue: {
            validate: jest.fn(async (payload: any) => {
              return {
                id: payload.id,
                name: payload.name,
                username: payload.username,
              };
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
            findUser: jest.fn(async (username: string) => {
              return username === DummyData.user.username
                ? DummyData.user
                : null;
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
      expect(
        await service.validateUser(
          DummyData.user.username,
          DummyData.user.password,
        ),
      ).toEqual(DummyData.user);
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
    it('should return string token', async () => {
      expect(
        typeof (await service.login({
          id: DummyData.user.id,
          username: DummyData.user.username,
          name: DummyData.user.name,
        })),
      ).toBe('string');
    });
  });
});
