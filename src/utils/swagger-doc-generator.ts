import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';

import { setupSwagger } from './swagger';
import { AppModule } from './../app.module';

const main = async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: true,
      logger: ['error', 'warn', 'log'],
    },
  );
  setupSwagger(app);
  await app.close();
};
main();
