import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    {
      ...JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '120s' },
      }),
      global: true,
    },
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
