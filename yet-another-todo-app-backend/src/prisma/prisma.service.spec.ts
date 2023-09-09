import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DummyData } from '../../test/dummy-data';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    it('should find unique user when provided username', async () => {
      const spy = jest.spyOn(service.user, 'findUnique');
      const username = DummyData.user.username;

      service.getUser(username);

      expect(spy).toHaveBeenCalledWith({
        where: {
          username,
        },
      });
    });
  });
});
