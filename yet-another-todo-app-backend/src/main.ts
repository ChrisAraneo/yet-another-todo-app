import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port: number = +process.env.PORT;
  const enabledCors = !!process.env.ENABLED_CORS;

  if (enabledCors) {
    const origin = `${process.env.CORS_ORIGIN}`;

    app.enableCors({
      origin: origin,
      methods: 'GET, PUT, POST, DELETE, OPTIONS',
    });
  }

  await app.listen(port);
}

bootstrap();
