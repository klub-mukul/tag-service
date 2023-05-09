import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as compression from 'compression';
import { logger } from './config/logger';

dotenv.config();
// console.log(process.env)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('tags-svc');
  app.use(compression());

  logger.info(`Server running on port ${3000}`);

  logger.info(`{$process.env.NODE_ENV}`);
  logger.info(dotenv.config);

  await app.listen(3000);
}
bootstrap();
