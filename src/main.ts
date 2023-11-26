import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap'); // Створення екземпляра Logger

  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const configService = app.get(ConfigService);

    const port = configService.get<number>('port');
    const hostname = configService.get<string>('hostname');

    await app.listen(port, hostname);
    logger.log(`Server is running on ${hostname}:${port}`);
  } catch (error) {
    logger.error(`Failed to start the server. Error: ${error}`);
  }


}
bootstrap();
