import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
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
        JwtService,
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
      ],
      exports: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
