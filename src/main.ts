import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    );

    await app.listen(3000);
    Logger.debug('Application is running: http://localhost:3000');
  } catch (err) {
    Logger.error('Failed to bootstrap the application', err);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
});
