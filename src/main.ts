import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as compression from 'compression';
import { logger } from './config/logger';
import * as morgan from 'morgan';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';
import { setupSwagger } from './utils/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(ConfigService);

  app.setGlobalPrefix('tags-svc');
  app.use(compression());
  app.use(morgan('combined'));

  logger.info(`${process.env.NODE_ENV}`);
  logger.info(dotenv.config);

  //swagger
  if (['development', 'staging'].includes(configService.nodeEnv)) {
    setupSwagger(app);
  }

  await app.listen(3000);
}
bootstrap();
