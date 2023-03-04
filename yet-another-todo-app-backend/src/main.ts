import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init();

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}

bootstrap();